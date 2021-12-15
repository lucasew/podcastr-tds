import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { API_BASEURL } from "../constants";
import { Maybe } from "../utils/Maybe";
import { useEpisode } from "./useEpisode";
import useInterval from "./useInterval";
import useProgress from "./useProgress";

type PlayerContextState = Maybe<{
    jumpToItem: (id: number) => void
    jumpToPosition: (pos: number) => void
    jumpToPositionDelta: (delta: number) => void
    togglePlayPause: (state?: boolean) => void
    changePlaybackSpeed: (speed: number) => void
    triggerProgressSave: () => void
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
    const progress = useProgress(podId || undefined)
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
        console.log("buscando progresso")
        console.log("position", progress.progress?.position)
        if (!progress.progress?.position) return
        audioRef.current.currentTime = progress.progress.position
    }, [podId, progress.fetcher.isFetched]) // eslint-disable-line
    useEffect(() => {
        if (podId) {
            audioRef.current.src = `${API_BASEURL}/api/public/episode/${podId}/listen`
            audioRef.current.play()
        }
    }, [podId])
    function triggerProgressSave() {
        return progress.snapshot(position, length)
    }
    return (
        <_PlayerContext.Provider value={{
            episode,
            triggerProgressSave,
            jumpToItem(id: number) {
                triggerProgressSave().then(() => {
                    setPodId(id)
                })
            },
            jumpToPosition(pos: number) { 
                triggerProgressSave().then(() => {
                    audioRef.current.currentTime = pos
                })
            },
            jumpToPositionDelta(delta: number) {
                triggerProgressSave().then(() => {
                    audioRef.current.currentTime += delta
                })
            },
            togglePlayPause(state?: boolean) {
                const s = state || audioRef.current.paused
                if (!s) {
                    triggerProgressSave()
                }
                s ? audioRef.current.play() : audioRef.current.pause()
                tick()
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