import jwt from "jsonwebtoken"
import { Metadata } from "next"
import { UserScope } from "@aapc/types"
import { FailureResult, JWTPayload, Nullable, SuccessResult } from "@/app/lib/types"
import { WEBSITE_NAME } from "@/app/lib/consts"

export function getMetadata(title: string = ""): Metadata {
    const t = `${title !== "" ? title + " - " : ""}${WEBSITE_NAME}`
    return {
        title: t,
    }
}

export function success<T>(result: T): SuccessResult<T> {
    return {
        success: true,
        result
    }
}

export function fail(message?: string): FailureResult {
    return {
        success: false,
        message: message ?? ""
    }
}

export function decodeJwt(token: string): Nullable<JWTPayload> {
    try {
        return <JWTPayload>jwt.decode(token)
    } catch (e) {
        return null
    }
}

export function getScopesFromToken(token: string): Nullable<UserScope[]> {
    const payload = decodeJwt(token)
    if (!payload) return null
    return payload.scopes
}
