import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { API_BASEURL } from "../constants";
import { Maybe } from "../utils/Maybe";
import { useEpisode } from "./useEpisode";

type PlayerContextState = Maybe<{
    jumpToItem: (id: number) => void
    jumpToPosition: (pos: number) => void
    episode: ReturnType<typeof useEpisode>
    player: React.MutableRefObject<HTMLAudioElement>
}>

const _PlayerContext = createContext<PlayerContextState>(null)

type PlayerContextProps = {
    children: ReactNode
}

export function PlayerContext(props: PlayerContextProps) {
    const [podId, setPodId] = useState<Maybe<number>>(null)
    const episode = useEpisode(podId)
    const audioRef = useRef(new Audio())
    useEffect(() => {
        audioRef.current.currentTime = 0
        if (podId) {
            audioRef.current.src = `${API_BASEURL}/api/public/episode/${podId}/listen`
            audioRef.current.play()
        }
    }, [podId])
    return (
        <_PlayerContext.Provider value={{
            episode,
            jumpToItem(id: number) { setPodId(id) },
            jumpToPosition(pos: number) { audioRef.current.currentTime = pos },
            player: audioRef
        }}>
            {props.children}
        </_PlayerContext.Provider>
    )
}


export function usePlayerState() {
    return useContext(_PlayerContext)
}