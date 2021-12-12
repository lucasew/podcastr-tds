import jwt from 'jsonwebtoken'

const secret = process.env['JWTKEY']
if (secret === undefined) {
    throw Error("JWTKEY is not defined")
}

export function jwtSign(payload: string | Object | Buffer) {
    return jwt.sign(payload, String(secret))
}

export function jwtVerify(token: string) {
    return jwt.verify(token, String(secret))
}