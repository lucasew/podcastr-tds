import { useLoginState } from "./LoginContext";
import requestAPI from "./requestAPI";
import { useApiEndpoint } from "./useApiEndpoint";

export default function useProgress(id?: number) {
    const loginState = useLoginState()
    const progress = useApiEndpoint<{
        isListened: boolean,
        id: number,
        lastActivity: Date,
        position: number
    }>(id && loginState?.isLoggedIn ? `/api/position/episode/${id}?jwt=${loginState.jwt}` : undefined)
    async function snapshot(position: number, length: number) {
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
        await requestAPI(`/api/position/episode/${id}?jwt=${loginState.jwt}&position=${position}&isListened=${isListened}`, {
            method: 'POST'
        })
        progress.refetch()
    }
    return {...progress, snapshot}
}