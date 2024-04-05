import { Article, IArticle, User } from "@aapc/types";
import IRepository from "../IRepository";
import users from "./data/users.json"
import news from "./data/news.json"
import researches from "./data/researches.json"
import { ArrayResultOptions, Nullable } from "../../util/helper.types";
import ArticleSorter, { ArticleSortFields } from "./sorters/ArticleSorter";
import { UserSortFields } from "./sorters/UserSorter";
import Sorter from "./sorters/Sorter";

export default class MemoryRepository implements IRepository {
    private readonly users: User[]
    private readonly news: Article[]
    private readonly researches: Article[]

    constructor() {
        this.users = []
        users.forEach(i => {
            this.users.push(new User(i))
        })

        this.news = []
        news.forEach(i => {
            this.getUserByUsername(i.publisher).then(r => {
                const j: IArticle = { ...i, ...{ publisher: r ?? new User() } }
                this.news.push(new Article(j))
            })
        })

        this.researches = []
        researches.forEach(i => {
            this.getUserByUsername(i.publisher).then(r => {
                const j: IArticle = { ...i, ...{ publisher: r ?? new User() } }
                this.researches.push(new Article(j))
            })
        })
    }

    async handleArrayResultOptions<K, T extends Sorter<K, any>> (sorter: (new(field: any, descending?: boolean) => T), arr: K[], options:ArrayResultOptions<string>): Promise<K[]> {
        if (options.sort) {
            arr = new sorter(options.sort.field, options.sort.descending?? false).sort(arr)
        }
        const start = options.startFrom ?? 0
        const end = options.maxResults ? start + options.maxResults : arr.length
        return arr.slice(start, end)
    }

    async getAllNews(options?: ArrayResultOptions<ArticleSortFields>): Promise<Article[]> {
        let r = this.news
        if (options) {
            r = await this.handleArrayResultOptions<Article, ArticleSorter>(ArticleSorter, r, options)
        }
        return r
    }

    async getNewsById(id: number): Promise<Nullable<Article>> {
        for (const i of this.news) {
            if (i.id === id) return i
        }
        return null
    }

    async searchNewsByTitle(title: string, options?: ArrayResultOptions<ArticleSortFields>): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }

    async createNews(a: Article): Promise<Article> {
        this.news.push(a)
        return a
    }

    async editNews(id: number, a: Article): Promise<Article> {
        if (a.id !== id) throw new TypeError("News edit ID mismatch")
        for (let i = 0; i < this.news.length; i++) {
            if (this.news[i].id === id) {
                this.news[i] = a;
                break
            }
        }
        return a
    }

    async deleteNews(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }


    async getAllResearch(options?: ArrayResultOptions<ArticleSortFields>): Promise<Article[]> {
        let r = this.researches
        if (options) {
            r = await this.handleArrayResultOptions<Article, ArticleSorter>(ArticleSorter, r, options)
        }
        return r
    }

    async getResearchById(id: number): Promise<Nullable<Article>> {
        for (const i of this.researches) {
            if (i.id === id) return i
        }
        return null
    }

    async searchResearchByTitle(title: string, options?: ArrayResultOptions<ArticleSortFields>): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }

    async createResearch(a: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }

    async editResearch(id: number, a: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }

    async deleteResearch(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }


    async getAllUsers(options?: ArrayResultOptions<UserSortFields>): Promise<User[]> {
        throw new Error("Not implemented yet")
    }

    async getUserByUsername(username: string): Promise<Nullable<User>> {
        for (const j of this.users) {
            if (j.username === username) return j
        }
        return null
    }

    async searchUserByUsername(username: string, options?: ArrayResultOptions<UserSortFields>): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async createUser(u: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async editUser(username: string, u: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async deleteUser(username: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
