import { DEFAULT_ID_LENGTH } from "@/util/const"
import { ValidationError } from "@/errors/ValidationError"
import { BadRequestError } from "@/errors/HTTPErrors"
import { Paginator } from "@aapc/types"
import { Request } from "express"
import { ArrayResult } from "@/util/types/types"

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

export function getPaginator<T extends {}>(
    type: { new (obj: object): T },
    req: Request,
    ar: ArrayResult<T>,
    p: number,
    pp: number
): Paginator<T> {
    const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`)
    const paginator = new Paginator(type, {
        resultsPerPage: pp,
        currentPage: p,
        totalResults: ar.totalResults,
        data: ar.results,
    })
    if (p < paginator.lastPage) {
        url.searchParams.set("p", String(p + 1))
        paginator.nextPageLocation = url.href
    }
    if (p > 1) {
        url.searchParams.set("p", String(p - 1))
        paginator.prevPageLocation = url.href
    }
    return paginator
}
