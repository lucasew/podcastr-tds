import Returner from './Returner';
import FeedParser from 'feedparser';
import fetch from 'node-fetch';

export default async function(url: string) {
    const result = await fetch(url)
    if (!result.ok) {
        Returner.errorCode(result.status, result.statusText)
    }
    const feedparser = new FeedParser({
        feedurl: url,
        normalize: true
    })
    const prom = new Promise((res, rej) => {
        let posts: FeedParser.Item[] = [];
        let meta: FeedParser.Meta | null = null; 
        feedparser.on('error', rej)
        feedparser.on('end', () => {
            res({...meta, posts})
        })
        feedparser.on('meta', (m: FeedParser.Meta) => {meta = m})
        feedparser.on('readable', function () {
            let post;
            while (post = this.read()) {
                posts.push(post)
            }
        })
    })
}