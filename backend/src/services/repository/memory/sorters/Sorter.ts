import { SortOptions } from "@/util/types/types"

export type Sorter<T, K extends SortOptions<T, any>> = (arr: T[], sortOptions?: K[]) => T[]
