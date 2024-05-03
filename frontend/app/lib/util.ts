import jwt from "jsonwebtoken"
import { Metadata } from "next"
import { UserScope } from "@aapc/types"
import { FailureResult, JWTPayload, SuccessResult } from "@/app/lib/types"
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

export function decodeJwt(token: string): JWTPayload {
    return <JWTPayload>jwt.decode(token)
}

export function getScopesFromToken(token: string): UserScope[] {
    return decodeJwt(token).scopes
}
