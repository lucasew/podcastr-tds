import { Maybe } from "../utils/Maybe";
import { useApiEndpoint } from "./useApiEndpoint";

export function useEpisode(id: Maybe<number>) {
    return useApiEndpoint<Maybe<{
            id: number,
            guid: string,
            title: string,
            url: string,
            icon: Maybe<string>
            description: string,
            mp3url: string,
            pubDate: Date,
            duration: number,
            __podcast__: {
                id: number,
                feed: string,
                homepage: string,
                title: string,
                icon: string,
                description: string
            }
        }>>(
           id === null ? undefined : `/api/public/episode/${id}`
        )
}