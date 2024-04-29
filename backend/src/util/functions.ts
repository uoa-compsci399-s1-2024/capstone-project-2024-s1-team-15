import { DEFAULT_ID_LENGTH } from "@/util/const"
import { ValidationError } from "@/errors/ValidationError"
import { BadRequestError } from "@/errors/HTTPErrors"

export function getRandomID(length: number = DEFAULT_ID_LENGTH) {
    let result = ""
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789-_"
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

export function validate<T>(inputType: { new (obj: any): T }, obj: any): T {
    try {
        return new inputType(obj)
    } catch (e) {
        if (e instanceof ValidationError) {
            throw new BadRequestError("One or more input parameters failed validation.", e.errors)
        }
        throw e
    }
}
