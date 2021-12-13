export default function timeExpressionToNumber(expr: string) {
    const parts = expr.split(":").map(Number)
    if (parts.filter(isNaN).length) {
        throw new Error(`invalid expression: ${expr}`)
    }
    let secs = 0
    let incr = 1
    while (parts.length > 0) {
        const part = parts.pop() as number
        secs += incr * part
        incr *= 60
    }
    return secs
}