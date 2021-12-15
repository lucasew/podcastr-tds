import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Maybe } from "../utils/Maybe";
import requestAPI from "./requestAPI";
import { withLocalStorage } from "./withLocalStorage";

type LoginContextState = Maybe<{
    login: (user: string, passwd: string) => Promise<void>
    signup: (user: string, passwd: string) => Promise<void>
    signout: () => void
    isLoggedIn: boolean
    state: Maybe<{
        id: number
        username: string
        is_admin: boolean
    }>
}>

const _LoginContext = createContext<LoginContextState>(null)

export function useLoginState() {
    return useContext(_LoginContext)
}

type LoginContextProps = {
    children: ReactNode
}

export function LoginContext(props: LoginContextProps) {
    const [jwt, setJwt] = withLocalStorage<Maybe<string>,Maybe<string>>(useState, 'jwt')(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setJwtCb = useCallback(setJwt, [])
    const [state, setState] = useState<Maybe<{id: number, username: string, is_admin: boolean}>>(null)
    useEffect(() => {
        if (!jwt) return setState(null)
        const parts = jwt.split('.')
        if (parts.length !== 3) {
            setJwtCb(() => null)
        }
        try {
            const decoded = atob(parts[1])
            console.log(decoded)
            setState(JSON.parse(decoded))
        } catch {
            setJwtCb(() => null)
        }
    }, [jwt, setJwtCb])
    const isLoggedIn = useMemo(() => !!state, [state])
    return (
        <_LoginContext.Provider value={{
            isLoggedIn,
            state,
            async login(user, password) {
                const jwt = await requestAPI<string>(`/api/auth/login?username=${user}&password=${password}`)
                setJwt(jwt)
            },
            async signup(user, password) {
                const user_id = await requestAPI<number>(`/api/auth/signup?username=${user}&password=${password}`)
                console.log("cadastro", user_id)
            },
            signout() {
                setJwt(null)
            }
        }}>
            {props.children}
        </_LoginContext.Provider>
    )
}