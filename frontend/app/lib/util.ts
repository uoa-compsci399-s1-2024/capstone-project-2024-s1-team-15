import jwt from "jsonwebtoken"
import { Metadata } from "next"
import { UserScope } from "@aapc/types"
import { FailureResult, JWTPayload, Nullable, SuccessResult } from "@/app/lib/types"
import { WEBSITE_NAME } from "@/app/lib/consts"

export function getMetadata(title: string = ""): Metadata {
    const t = `${title !== "" ? title + " - " : ""}${WEBSITE_NAME}`
    return {
        title: t,
        icons: "/icon.png",
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

export function getScopesFromToken(token: Nullable<string>): Nullable<UserScope[]> {
    if (!token) {
        return null  // token is null
    }

    const payload = decodeJwt(token)
    if (!payload) {
        return null  // failed to retrieve scopes from token
    }

    return payload.scopes
}
