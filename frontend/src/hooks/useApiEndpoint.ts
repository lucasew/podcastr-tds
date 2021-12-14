import { Maybe } from "../utils/Maybe";
import {useQuery} from 'react-query'
import { API_BASEURL } from "../constants";

export function useApiEndpoint<T>(href?: string) {
    return useQuery<Maybe<T>, Error>(String(href), async () => {
        if (href === undefined) return null
        const res = await fetch(`${API_BASEURL}${href}`)
        const json = await res.json()
        if (!res.ok) {
            const {error} = json
            throw new Error(`${res.status} ${res.statusText}: ${error}`)
        }
        const data = json.data as T
        return data
    })
}