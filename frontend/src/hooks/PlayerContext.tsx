import React, { createContext, useContext, useEffect, useState } from "react";
import { Maybe } from "../utils/Maybe";

type PlayerState = Maybe<{
    icon: string
    url: string
    author: string
    title: string
    length: number
    position: number
    item_id: number // id do podcast
}>

type PlayerContextState = {
    jumpToItem: (id: number) => Promise<void>
    jumpToPosition: (pos: number) => Promise<void>
    state: PlayerState
}

const _PlayerContext = createContext<PlayerContextState>(null)

export function PlayerContext(children: React.ReactNode) {
    const [podId, setPodId] = useState<Maybe<number>>(null)
    const [itemMetadata, setItemMetadata] = useState<PlayerState>(null)

    useEffect(() => {

    }, [podId])
    return (

    )
}


export function usePlayerState() {
    const ret = useContext(PlayerContext)
    PlayerContext.Provider
}