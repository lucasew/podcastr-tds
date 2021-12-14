import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { TypeOfExpression } from "typescript";
import { API_BASEURL } from "../constants";
import { Maybe } from "../utils/Maybe";
import { useEpisode } from "./useEpisode";

type PlayerContextState = Maybe<{
    jumpToItem: (id: number) => Promise<void>
    jumpToPosition: (pos: number) => Promise<void>
    episode: ReturnType<typeof useEpisode>
    position: number
}>

const _PlayerContext = createContext<PlayerContextState>(null)

type PlayerContextProps = {
    children: ReactNode
}

export function PlayerContext(props: PlayerContextProps) {
    const [podId, setPodId] = useState<Maybe<number>>(null)
    const episode = useEpisode(podId)
    const [position, setPosition] = useState(0)
    useEffect(() => {
        setPosition(0)
    }, [episode])
    return (
        <_PlayerContext.Provider value={{
            episode,
            position,
            async jumpToItem(id: number) { setPodId(id) },
            async jumpToPosition(pos: number) { setPosition(pos) }
        }}>
            {props.children}
        </_PlayerContext.Provider>
    )
}


export function usePlayerState() {
    return useContext(_PlayerContext)
}