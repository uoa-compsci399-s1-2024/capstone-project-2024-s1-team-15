export type Nullable<T> = T | null

export interface ArrayResultOptions<T extends string> {
    startFrom?: number
    maxResults?: number
    sort?: {
        field: T
        descending?: boolean
    }
}

export interface ArrayResult<T> {
    totalResults: number
    results: T[]
}


export interface InputValidationError<T> {
    field: keyof T
    message: string
}
