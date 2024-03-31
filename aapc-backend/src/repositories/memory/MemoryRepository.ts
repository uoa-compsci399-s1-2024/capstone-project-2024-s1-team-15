import { Article, User } from "aapc-types";
import IRepository from "../IRepository";
import users from "./data/users.json"
import news from "./data/news.json"
import researches from "./data/researches.json"
import { IArticle } from "aapc-types/src/Article";
import { Nullable } from "../../util/types";

export default class MemoryRepository implements IRepository {
    users: User[]
    news: Article[]
    researches: Article[]

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

    async getAllNews(): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }

    async getNewsById(id: number): Promise<Nullable<Article>> {
        throw new Error("Method not implemented.");
    }

    async getAllResearch(): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }

    async getResearchById(id: number): Promise<Nullable<Article>> {
        throw new Error("Method not implemented.");
    }

    async getAllUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async getUserByUsername(username: string): Promise<Nullable<User>> {
        for (const u of this.users) {
            if (u.username === username) return u
        }
        return null
    }
}
