import { Article, IArticle, IUser, User, PollenData, ImageMetadata, ImageFormat, IImageMetadata, } from "@aapc/types"
import {
    ArrayResult,
    ArrayResultOptions,
    ArticleSortFields, ImageMetadataSortFields,
    Nullable,
    Sorter,
    SortOptions,
    UserSortFields
} from "@/util/types/types"
import IRepository from "@/services/repository/repository.service"
import users from "@/services/repository/memory/data/users.json"
import news from "@/services/repository/memory/data/news.json"
import researches from "@/services/repository/memory/data/researches.json"
import imageMetadata from "@/services/repository/memory/data/imageMetadata.json"
import pollenData from "@/services/repository/memory/data/pollenData.json"

export default class MemoryRepository implements IRepository {
    private readonly users: User[]
    private readonly news: Article[]
    private readonly researches: Article[]
    private pollenData: PollenData[]
    private readonly imageMetadata: ImageMetadata[]

    constructor() {
        this.users = []
        users.forEach((i) => {
            this.users.push(new User(<IUser>i))
        })

        this.news = []
        news.forEach((i) => {
            this.getUserByUsername(i.publisher).then((r) => {
                const j: Partial<IArticle> = { ...i, ...{ publisher: r ?? new User() } }
                this.news.push(new Article(j))
            })
        })

        this.researches = []
        researches.forEach((i) => {
            this.getUserByUsername(i.publisher).then((r) => {
                const j: Partial<IArticle> = { ...i, ...{ publisher: r ?? new User() } }
                this.researches.push(new Article(j))
            })
        })

        this.imageMetadata = []
        imageMetadata.forEach(i => {
            this.getUserByUsername(i.createdBy).then(r => {
                const j: Partial<IImageMetadata> = {
                    ...i,
                    ...{ createdBy: r ?? new User(), format: ImageFormat[i.format as "png" | "jpg"] }
                }
                this.imageMetadata.push(new ImageMetadata(j))
            })
        })

        this.pollenData = pollenData as PollenData[]
    }

    handleArrayResultOptions<T, K extends SortOptions<T, any>>(
        arr: T[],
        options?: ArrayResultOptions<K>,
        sorter?: Sorter<T, K>
    ): T[] {
        let start, end
        if (options) {
            start = options.startFrom ?? 0
            end = options.maxResults ? options.maxResults + start : undefined
            if (sorter) {
                sorter(arr, options.sort)
            }
        }
        return arr.slice(start, end)
    }

    async getAllNews(
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        let r = structuredClone(this.news)
        return {
            totalResults: r.length,
            results: this.handleArrayResultOptions(r, options),
        }
    }

    async getNewsById(id: string): Promise<Nullable<Article>> {
        for (const a of this.news) {
            if (a.id === id) {
                return a
            }
        }
        return null
    }

    async getAllNewsByUser(
        username: string,
        title?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ) {
        let r = structuredClone(this.news).filter((a) => a.publisher.username === username)

        if (title) {
            r = r.filter((a) => a.title.toLowerCase().includes(title.toLowerCase()))
        }

        return {
            totalResults: r.length,
            results: this.handleArrayResultOptions(r, options),
        }
    }

    async getAllResearchByUser(
        username: string,
        title?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ) {
        let r = structuredClone(this.researches).filter((a) => a.publisher.username === username)

        if (title) {
            r = r.filter((a) => a.title.toLowerCase().includes(title.toLowerCase()))
        }

        return {
            totalResults: r.length,
            results: this.handleArrayResultOptions(r, options),
        }
    }

    async searchNewsByTitle(
        title: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        let r = this.news.filter((a) => a.title.toLowerCase().includes(title.toLowerCase()))
        return {
            totalResults: r.length,
            results: this.handleArrayResultOptions(r, options),
        }
    }

    async createNews(a: Article): Promise<Article> {
        this.news.push(a)
        return a
    }

    async editNews(id: string, a: Article): Promise<Article> {
        if (a.id !== id) throw new TypeError("News edit ID mismatch")
        for (let i = 0; i < this.news.length; i++) {
            if (this.news[i].id === id) {
                this.news[i] = a
                break
            }
        }
        return a
    }

    async deleteNews(id: string): Promise<void> {
        for (let i = 0; i < this.news.length; i++) {
            if (this.news[i].id === id) {
                this.news.splice(i, 1)
                return
            }
        }
    }

    async getAllResearch(
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        let r = structuredClone(this.researches)
        return {
            totalResults: r.length,
            results: this.handleArrayResultOptions(r, options),
        }
    }

    async getResearchById(id: string): Promise<Nullable<Article>> {
        for (const a of this.researches) {
            if (a.id === id) return a
        }
        return null
    }

    async searchResearchByTitle(
        title: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        let r = this.researches.filter((a) => a.title.toLowerCase().includes(title.toLowerCase()))
        return {
            totalResults: r.length,
            results: this.handleArrayResultOptions(r, options),
        }
    }

    async createResearch(a: Article): Promise<Article> {
        this.researches.push(a)
        return a
    }

    async editResearch(id: string, a: Article): Promise<Article> {
        if (a.id !== id) throw new TypeError("Research edit ID mismatch")
        for (let i = 0; i < this.researches.length; i++) {
            if (this.researches[i].id === id) {
                this.researches[i] = a
                break
            }
        }
        return a
    }

    async deleteResearch(id: string): Promise<void> {
        for (let i = 0; i < this.researches.length; i++) {
            if (this.researches[i].id === id) {
                this.researches.splice(i, 1)
                return
            }
        }
    }

    async getAllUsers(options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>> {
        let r = structuredClone(this.users)
        return {
            totalResults: r.length,
            results: this.handleArrayResultOptions(r, options),
        }
    }

    async getUserByUsername(username: string): Promise<Nullable<User>> {
        for (const u of this.users) {
            if (u.username === username) return u
        }
        return null
    }

    async searchUserByUsername(
        username: string,
        options?: ArrayResultOptions<SortOptions<User, UserSortFields>>
    ): Promise<ArrayResult<User>> {
        let r = this.users.filter((a) => a.username.toLowerCase().includes(username.toLowerCase()))
        return {
            totalResults: r.length,
            results: this.handleArrayResultOptions(r, options),
        }
    }

    async createUser(u: User): Promise<User> {
        this.users.push(u)
        return u
    }

    async editUser(username: string, u: User): Promise<User> {
        if (username !== u.username) throw new TypeError("User edit ID mismatch")
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                this.users[i] = u
                break
            }
        }
        return u
    }

    async deleteUser(username: string): Promise<void> {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                this.users.splice(i, 1)
                return
            }
        }
    }

    async getPollenDataset(): Promise<PollenData[]> {
        return structuredClone(this.pollenData)
    }

    async deletePollenDataset(): Promise<any> {
        this.pollenData = []
    }

    async createPollenDataset(pollenData: PollenData[]): Promise<any> {
        this.pollenData = pollenData
    }

    async createImageMetadata(im: ImageMetadata): Promise<ImageMetadata> {
        this.imageMetadata.push(im)
        return im
    }

    async getImageMetadataById(id: string): Promise<Nullable<ImageMetadata>> {
        for (const im of this.imageMetadata) {
            if (im.id === id) {
                return im
            }
        }
        return null
    }

    async getImageMetadataCreatedBy(
        username?: Nullable<string>,
        options?: ArrayResultOptions<SortOptions<ImageMetadata, ImageMetadataSortFields>>
    ): Promise<ArrayResult<ImageMetadata>> {
        // Return empty list if username is null, return all if username is undefined
        let returnIm: ImageMetadata[] = structuredClone(this.imageMetadata)

        if (username !== null) {
            returnIm = returnIm.filter(i => i.createdBy.username === username)
        } else {
            returnIm = []
        }

        return {
            totalResults: returnIm.length,
            results: this.handleArrayResultOptions(returnIm, options)
        }
    }

    async editImageMetadata(id: string, im: ImageMetadata): Promise<ImageMetadata> {
        if (im.id !== id) throw new TypeError("Image metadata edit ID mismatch")
        for (let i = 0; i < this.imageMetadata.length; i++) {
            if (this.imageMetadata[i].id === id) {
                this.imageMetadata[i] = im
            }
        }
        return im
    }

    async deleteImageMetadata(id: string): Promise<void> {
        for (let i = 0; i < this.imageMetadata.length; i++) {
            if (this.imageMetadata[i].id === id) {
                this.imageMetadata.splice(i, 1)
                return
            }
        }
    }
}
