import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import LoginPage from "../pages/Login";
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
    const [state, setState] = useState<Maybe<{id: number, username: string, is_admin: boolean}>>(null)
    useEffect(() => {
        if (!jwt) return setState(null)
        const parts = jwt.split('.')
        if (parts.length != 3) {
            setJwt(() => null)
        }
        try {
            const decoded = atob(parts[2])
            console.log(decoded)
            setState(JSON.parse(decoded))
        } catch {
            setJwt(() => null)
        }
    }, [jwt])
    const isLoggedIn = useMemo(() => !!state, [state])
    return (
        <_LoginContext.Provider value={{
            isLoggedIn,
            state,
            async login(user, password) {
                try {
                    const jwt = await requestAPI<string>(`/api/auth/login?username=${user}&password=${password}`)
                    setJwt(jwt)
                } catch (e) {
                    alert((e as Error).message)
                }
                console.log('login')
            },
            async signup(user, password) {
                try {
                    const user_id = await requestAPI<number>(`/api/auth/login?username=${user}&password=${password}`)
                    alert(`Novo usuário com id ${user_id} criado!`)
                } catch (e) {
                    alert((e as Error).message)
                }
                console.log('cadastro')
            },
            signout() {
                setJwt(null)
            }
        }}>
            {props.children}
        </_LoginContext.Provider>
    )
}