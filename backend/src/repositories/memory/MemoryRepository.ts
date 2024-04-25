import users from "./data/users.json"
import news from "./data/news.json"
import researches from "./data/researches.json"

import { Article, IArticle, User } from "@aapc/types"
import IRepository from "../IRepository"
import { ArrayResult, ArrayResultOptions, Nullable, SortOptions } from "../../util/types/util.types"
import { ArticleSortFields } from "./sorters/article.sorter"
import { UserSortFields } from "./sorters/user.sorter"
import { Sorter } from "./sorters/Sorter"

export default class MemoryRepository implements IRepository {
    private readonly users: User[]
    private readonly news: Article[]
    private readonly researches: Article[]

    constructor() {
        this.users = []
        users.forEach((i) => {
            this.users.push(new User(i))
        })

        this.news = []
        news.forEach((i) => {
            this.getUserByUsername(i.publisher).then((r) => {
                const j: IArticle = { ...i, ...{ publisher: r ?? new User() } }
                this.news.push(new Article(j))
            })
        })

        this.researches = []
        researches.forEach((i) => {
            this.getUserByUsername(i.publisher).then((r) => {
                const j: IArticle = { ...i, ...{ publisher: r ?? new User() } }
                this.researches.push(new Article(j))
            })
        })
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
        throw new TypeError(`No news with ID ${id}.`)
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
}
