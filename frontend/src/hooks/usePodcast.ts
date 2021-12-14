import { useApiEndpoint } from "./useApiEndpoint";

export default function usePodcast(id?: number) {
    return useApiEndpoint<{
        id: number,
        feed: string,
        homepage: string,
        title: string,
        icon: string,
        description: string,
        episodes: Array<{
            id: number,
            guid: string,
            title: string,
            url: string,
            icon: string,
            description: string,
            mp3url: string,
            pubDate: Date,
            duration: number
        }>
    }>((!id || isNaN(id)) ? undefined : `/api/public/podcast/${id}`)
}