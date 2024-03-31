export interface IPaginator<T extends {}> {
    data: T[]
    prevPage: number | null
    nextPage: number | null
    currentPage: number
    lastPage: number
    resultsPerPage: number
    totalResults: number
}

export default class Paginator<T extends {}> implements IPaginator<T> {
    /**
     * The default constructor for the Paginator.
     * @param type The type of data that the Paginator holds.
     */
    constructor(type: (new(obj: T) => T));

    /**
     * The overloaded constructor that takes in an object representing a Paginator.
     * @param type The type of data that the Paginator holds.
     * @param obj The object representing a Paginator.
     */
    constructor(type: (new(obj: T) => T), obj: Partial<IPaginator<T>>);
    constructor(type: (new(obj: T) => T), obj?: Partial<IPaginator<T>>) {
        this.data = []
        if (obj?.data) {
            obj.data.forEach((v: T) => {
                this.data.push(new type(v))
            })
        }
        this.resultsPerPage = obj?.resultsPerPage ?? 15
        this.totalResults = obj?.totalResults ?? this.data.length
        this.prevPage = obj?.prevPage ?? null
        this.nextPage = obj?.nextPage ?? null
        this.currentPage = obj?.currentPage ?? 1
        this.lastPage = obj?.lastPage ?? Math.ceil(this.totalResults / this.resultsPerPage)
    }

    data: T[]
    prevPage: number | null
    nextPage: number | null
    currentPage: number
    lastPage: number
    resultsPerPage: number
    totalResults: number
}

