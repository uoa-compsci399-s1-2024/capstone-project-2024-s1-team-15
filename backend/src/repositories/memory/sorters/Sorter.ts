export default interface Sorter<T, F extends string> {
    field: F
    descending: boolean
    sort: (r: T[]) => T[]
}
