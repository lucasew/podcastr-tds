import { useToast } from "@chakra-ui/toast";
import { useLoginState } from "./LoginContext";
import requestAPI from "./requestAPI";
import { useApiEndpoint } from "./useApiEndpoint";

export default function useProgress(id?: number) {
    const loginState = useLoginState()
    const toast = useToast()
    const progress = useApiEndpoint<{
        isListened: boolean,
        id: number,
        lastActivity: Date,
        position: number
    }>(id && loginState?.isLoggedIn ? `/api/position/episode/${id}?jwt=${loginState.jwt}` : undefined)
    async function snapshot(position: number, length: number) {
        console.log("snapshot", id, position, length, loginState?.state?.username)
        if (!loginState) {return}
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
        progress.refetch()
    }
    return {
        progress: progress.isLoading ? null : (progress.data || {
            isListened: false,
            lastActivity: new Date(),
            position: 0
        }),
        fetcher: progress,
        snapshot
    }
}