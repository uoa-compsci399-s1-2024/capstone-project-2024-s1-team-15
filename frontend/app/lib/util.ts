import { Metadata } from "next"
import { WEBSITE_NAME } from "@/app/lib/consts"
import { FailureResult, SuccessResult } from "@/app/lib/types";

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
