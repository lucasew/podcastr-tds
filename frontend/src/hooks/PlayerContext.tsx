import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { API_BASEURL } from "../constants";
import { Maybe } from "../utils/Maybe";
import { useEpisode } from "./useEpisode";
import useInterval from "./useInterval";

type PlayerContextState = Maybe<{
    jumpToItem: (id: number) => void
    jumpToPosition: (pos: number) => void
    jumpToPositionDelta: (delta: number) => void
    togglePlayPause: (state?: boolean) => void
    changePlaybackSpeed: (speed: number) => void
    speed: number
    isPaused: boolean,
    position: number,
    length: number,
    ticker: number,
    episode: ReturnType<typeof useEpisode>
    // player: React.MutableRefObject<HTMLAudioElement>
}>

const _PlayerContext = createContext<PlayerContextState>(null)

type PlayerContextProps = {
    children: ReactNode
}

export function PlayerContext(props: PlayerContextProps) {
    const [podId, setPodId] = useState<Maybe<number>>(null)
    const episode = useEpisode(podId)
    const audioRef = useRef(new Audio())
    const position = audioRef.current.currentTime || 0
    const length = audioRef.current.duration || 1
    const paused = audioRef.current.paused
    const speed = audioRef.current.playbackRate || 1
    const [ticker, tick] = useInterval(1000)
    useEffect(() => {
        console.log(ticker)
    }, [ticker])
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
            jumpToPositionDelta(delta: number) { audioRef.current.currentTime += delta },
            togglePlayPause(state?: boolean) {
                const s = state !== undefined ? state  : !audioRef.current.paused
                console.log('pause', state, s)
                s ? audioRef.current.play() : audioRef.current.pause()
                setTimeout(tick, 100)
            },
            changePlaybackSpeed(rate: number) {
                audioRef.current.playbackRate = rate
            },
            speed,
            isPaused: paused,
            length,
            position,
            ticker
        }}>
            {props.children}
        </_PlayerContext.Provider>
    )
}


export function usePlayerState() {
    return useContext(_PlayerContext)
}