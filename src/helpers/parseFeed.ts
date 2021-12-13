import Returner from './Returner';
import {parse} from 'rss-to-json'

export default async function parseFeed(url: string) {
    console.log(`Parsing ${url}`)
    return await parse(url, {})
}