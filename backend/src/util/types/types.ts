export type Nullable<T> = T | null

export interface SortOptions<K, T extends keyof K> {
    field: T
    descending?: boolean
}

export interface ArrayResultOptions<T extends SortOptions<any, string>> {
    startFrom?: number
    maxResults?: number
    sort?: T[]
}

export interface ArrayResult<T> {
    totalResults: number
    results: T[]
}

export type Sorter<T, K extends SortOptions<T, any>> = (arr: T[], sortOptions?: K[]) => T[]

export type ArticleSortFields = "publishedAt" | "lastEditedAt"

export type UserSortFields = "registeredAt" | "displayName" | "username"

export type ImageMetadataSortFields = "createdAt" | "size"
