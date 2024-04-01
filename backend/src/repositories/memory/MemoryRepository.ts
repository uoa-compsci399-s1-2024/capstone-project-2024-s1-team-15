import { Article, IArticle, User } from "@aapc/types";
import IRepository from "../IRepository";
import users from "./data/users.json"
import news from "./data/news.json"
import researches from "./data/researches.json"
import { Nullable } from "../../util/types";

// interface IArticleInput extends Omit<IArticle, "id" | "lastEditedAt" | "publishedAt" | "publisher"> {}

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

    async createNews(a: Article): Promise<Article> {
        this.news.push(a)
        return a
    }
    async editNews(id: number, a: Article): Promise<Article> {
        if ( a.id !== id ) throw new TypeError("News edit ID mismatch")
        for (let i = 0; i < this.news.length; i++) {
            if (this.news[i].id === id) { this.news[i] = a; break }
        }
        return a
    }
    deleteNews(id: number): Promise<Article> {
        throw new Error("Method not implemented.");
    }
    createResearch(a: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }
    editResearch(id: number, a: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }
    deleteResearch(id: number): Promise<Article> {
        throw new Error("Method not implemented.");
    }
    createUser(u: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    editUser(u: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(u: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async getAllNews(): Promise<Article[]> {
        return this.news
    }

    async getNewsById(id: number): Promise<Nullable<Article>> {
        for (const i of this.news) {
            if (i.id === id) return i
        }
        return null
    }

    async getAllResearch(): Promise<Article[]> {
        return this.researches
    }

    async getResearchById(id: number): Promise<Nullable<Article>> {
        for (const i of this.researches) {
            if (i.id === id) return i
        }
        return null
    }

    async getAllUsers(): Promise<User[]> {
        return this.users
    }

    async getUserByUsername(username: string): Promise<Nullable<User>> {
        for (const j of this.users) {
            if (j.username === username) return j
        }
        return null
    }
}
