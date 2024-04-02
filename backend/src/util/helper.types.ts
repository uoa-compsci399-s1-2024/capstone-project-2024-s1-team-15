export type Nullable<T> = T | null

export interface ArrayResultOptions<T extends string> {
    startFrom?: number
    maxResults?: number
    sort?: {
        field: T
        descending?: boolean
    }
}
