export default function numberToTimeExpression(secs: number) {
    const s = Math.floor(secs % 60)
    const m = Math.floor((secs / 60) % 60)
    const h = Math.floor(secs / 3600)
    return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`
}