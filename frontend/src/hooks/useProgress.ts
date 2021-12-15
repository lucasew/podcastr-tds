import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { Maybe } from "../utils/Maybe";
import { useLoginState } from "./LoginContext";
import requestAPI from "./requestAPI";
import { useApiEndpoint } from "./useApiEndpoint";

export default function useProgress(id?: number) {
    const loginState = useLoginState()
    const toast = useToast({
        position: 'top-right'
    })
    const [progress, setProgress] = useState<Maybe<{
        isListened: boolean,
        id: number,
        lastActivity: Date,
        position: number
    }>>(null)
    useEffect(() => {
        if (!id) return
        if (!loginState?.jwt) return
        requestAPI<typeof progress>(`/api/position/episode/${id}?jwt=${loginState.jwt}`)
            .then((progress) => {
                if (!progress) {
                    setProgress(function () {
                        return {
                            isListened: false,
                            position: 0,
                            id: 0,
                            lastActivity: new Date()
                        }
                    })
                } else {
                    setProgress(progress)
                }
            })
            .catch((e: Error) => {
                toast({
                    title: "Erro ao buscar ultima posição salva",
                    description: e,
                    status: 'error'
                })
            })
    }, [id])
    async function snapshot(position: number, length: number) {
        console.log("snapshot", id, position, length, loginState?.state?.username)
        if (!loginState) return
        if (!id) {
            console.log("snapshot: id vazio, abortando")
            return
        }
        if (!loginState.isLoggedIn) {
            console.log("snapshot: não está logado, abortando")
            return
        }
        const isListened = (position / length) > 0.95 || length - position < 30
        await requestAPI<number>(`/api/position/episode/${id}?jwt=${loginState.jwt}&position=${position}&isListened=${isListened}`, {
            method: 'POST'
        }).catch((e: Error) => {
            toast({
                title: "Erro ao salvar progresso de reprodução.",
                description: e.message,
                status: 'error'
            })
        })
        .then((n) => {
            toast({
                title: "Progresso salvo com sucesso!",
                status: 'success'
            })
            return n
        })
    }
    return {
        progress,
        snapshot
    }
}