import { Nullable } from "@/app/lib/types";

export type FetchOptions = {
    token?: Nullable<string>
}

export type PaginatedResultOptions<T> = {
    page?: number
    perPage?: number
    sortBy?: keyof T
    descending?: boolean
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

export function getSearchParams(options?: PaginatedResultOptions<any>): URLSearchParams {
    const searchParams = new URLSearchParams()
    if (options?.page) {
        searchParams.append("p", String(options.page))
    }
    if (options?.perPage) {
        searchParams.append("pp", String(options.perPage))
    }
    if (options?.sortBy) {
        searchParams.append("pp", String(options.sortBy))
    }
    if (options?.descending) {
        searchParams.append("pp", String(options.descending))
    }
    return searchParams
}
