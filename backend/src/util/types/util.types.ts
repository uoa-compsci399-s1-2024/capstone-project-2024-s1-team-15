export type Nullable<T> = T | null;

export interface ArrayResultOptions<T extends SortOptions<any, string>> {
  startFrom?: number;
  maxResults?: number;
  sort?: T[];
}

export interface SortOptions<K, T extends keyof K> {
  field: T;
  descending?: boolean;
}

export interface ArrayResult<T> {
  totalResults: number;
  results: T[];
}
