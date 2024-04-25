import { SortOptions } from "../../../util/types/util.types";

export type Sorter<T, K extends SortOptions<T, any>> = (
  arr: T[],
  sortOptions?: K[],
) => T[];
