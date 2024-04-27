import { DEFAULT_ID_LENGTH } from "@/util/const"

export function getRandomID(length: number = DEFAULT_ID_LENGTH) {
    let result = ""
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789-_"
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
