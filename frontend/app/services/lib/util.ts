import { Nullable } from "@/app/lib/types";

export type FetchOptions = {
    token?: Nullable<string>
}

export function getHeaders(options?: FetchOptions): Headers {
    const headers: Headers = new Headers()
    if (options?.token !== undefined && options?.token !== null) {
        headers.append("Authorization", `Bearer ${options.token}`)
    }
    headers.append("Content-Type", "application/json")
    headers.append("Accept", "application/json")
    return headers
}
