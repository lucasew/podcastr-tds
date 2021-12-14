import { API_BASEURL } from "../constants"
import { Maybe } from "../utils/Maybe"

export default async function requestAPI<T>(href?: string, options?: RequestInit): Promise<Maybe<T>> {
    if (!href) {
        return null
    }
    const res = await fetch(`${API_BASEURL}${href}`)
    const json = await res.json()
    if (!res.ok) {
        const {error} = json
        throw new Error(`${res.status} ${res.statusText}: ${error}`)
    }
    const data = json.data as T
    return data
}