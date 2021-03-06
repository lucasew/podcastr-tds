import { Maybe } from "../utils/Maybe";
import {useQuery} from 'react-query'
import requestAPI from "./requestAPI";

export function useApiEndpoint<T>(href?: string, options?: RequestInit) {
    return useQuery<Maybe<T>, Error>(String(href), async () => {
        return requestAPI<T>(href, options)
    })
}