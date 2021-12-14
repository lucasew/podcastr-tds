import { useQuery } from "react-query";
import { API_BASEURL } from "../constants";
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
            duration: number
        }>>(
           id === null ? undefined : `/api/public/episode/${id}`
        )
}