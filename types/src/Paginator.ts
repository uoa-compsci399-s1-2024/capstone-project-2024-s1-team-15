export interface IPaginator<T extends {}> {
    data: T[]
    currentPage: number
    lastPage: number
    resultsPerPage: number
    totalResults: number
    prevPageLocation: string
    nextPageLocation: string
}

export default class Paginator<T extends {}> implements IPaginator<T> {
    /**
     * The default constructor for the Paginator.
     * @param type The type of data that the Paginator holds.
     */
    constructor(type: (new(obj: object) => T));

    /**
     * The overloaded constructor that takes in an object representing a Paginator.
     * @param type The type of data that the Paginator holds.
     * @param obj The object representing a Paginator.
     */
    constructor(type: (new(obj: object) => T), obj: Partial<IPaginator<T>>);
    constructor(type: (new(obj: object) => T), obj?: Partial<IPaginator<T>>) {
        this.data = []
        if (obj?.data) {
            obj.data.forEach((v: T) => {
                this.data.push(new type(v))
            })
        }
        this.resultsPerPage = obj?.resultsPerPage ?? 15
        this.totalResults = obj?.totalResults ?? this.data.length
        this.currentPage = obj?.currentPage ?? 1
        this.lastPage = obj?.lastPage ?? Math.ceil(this.totalResults / this.resultsPerPage)
        this.prevPageLocation = obj?.prevPageLocation ?? ""
        this.nextPageLocation = obj?.nextPageLocation ?? ""
    }

    data: T[]
    currentPage: number
    lastPage: number
    resultsPerPage: number
    totalResults: number
    prevPageLocation: string
    nextPageLocation: string
}
