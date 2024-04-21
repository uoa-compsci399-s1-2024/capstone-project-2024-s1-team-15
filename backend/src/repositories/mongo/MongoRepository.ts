import IRepository, { BaseRepository } from "../IRepository";
import { Article, ArticleType, User } from "@aapc/types";
import { ArrayResult, ArrayResultOptions, Nullable, SortOptions } from "../../util/types/util.types";
import { ArticleSortFields } from "../sorters/article.sorter";
import { UserSortFields } from "../sorters/user.sorter";
import { Collection, Db, Filter, MongoClient, ServerApiVersion } from "mongodb";

export default class MongoRepository extends BaseRepository implements IRepository {
    private readonly db: Db
    private readonly articles: Collection
    private readonly users: Collection

    constructor(uri: string) {
        super()
        this.db = new MongoClient(uri, { serverApi: ServerApiVersion.v1 }).db("AAPC")
        this.articles = this.db.collection("Articles")
        this.users = this.db.collection("Users")
    }

    async createNews(a: Article): Promise<Article> {
        const aObj = <any>a
        aObj.publisher = a.publisher.username
        await this.articles.insertOne(aObj)
        return a
    }

    async createResearch(a: Article): Promise<Article> {
        const aObj = <any>a
        aObj.publisher = a.publisher.username
        await this.articles.insertOne(aObj)
        return a
    }

    async createUser(u: User): Promise<User> {
        await this.users.insertOne(u)
        return u
    }

    async deleteNews(id: string): Promise<void> {
        throw Error()
    }

    async deleteResearch(id: string): Promise<void> {
        throw Error()
    }

    async deleteUser(username: string): Promise<void> {
        throw Error()
    }

    async editNews(id: string, a: Article): Promise<Article> {
        throw Error()
    }

    async editResearch(id: string, a: Article): Promise<Article> {
        throw Error()
    }

    async editUser(username: string, u: User): Promise<User> {
        throw Error()
    }

    async getAllNews(options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>> {
        const r: Article[] = []
        const q: Filter<any> = { articleType: ArticleType.news }
        const result = this.articles.find(q)
        const rC = await this.articles.countDocuments(q)
        for await (const document of result) {
            const a = new Article(<object>document)
            a.publisher = await this.getUserByUsername(document.publisher) ?? new User()
            r.push(a)
        }
        return {
            totalResults: rC,
            results: this.handleArrayResultOptions(r, options)
        }
    }

    async getAllResearch(options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>> {
        const r: Article[] = []
        const q: Filter<any> = { articleType: ArticleType.research }
        const result = this.articles.find(q)
        const rC = await this.articles.countDocuments(q)
        for await (const document of result) {
            const a = new Article(<object>document)
            a.publisher = await this.getUserByUsername(document.publisher) ?? new User()
            r.push(a)
        }
        return {
            totalResults: rC,
            results: this.handleArrayResultOptions(r, options)
        }
    }

    async getAllUsers(options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>> {
        const r: User[] = []
        const result = this.users.find()
        const rC = await this.users.countDocuments()
        for await (const document of result) {
            const u = new User(<object>document)
            r.push(u)
        }
        return {
            totalResults: rC,
            results: this.handleArrayResultOptions(r, options)
        }
    }

    async getNewsById(id: string): Promise<Nullable<Article>> {
        const n = await this.articles.findOne({ articleType: 0, id: id })
        if (n === null) { return null }
        const a = new Article(<object>n)
        a.publisher = await this.getUserByUsername(n.publisher) ?? new User()
        return a
    }

    async getResearchById(id: string): Promise<Nullable<Article>> {
        const n = await this.articles.findOne({ articleType: 1, id: id })
        if (n === null) { return null }
        const a = new Article(<object>n)
        a.publisher = await this.getUserByUsername(n.publisher) ?? new User()
        return a
    }

    async getUserByUsername(username: string): Promise<Nullable<User>> {
        const u = await this.users.findOne({ username: username })
        if (u === null) { return null }
        return new User(<object>u)
    }

    async searchNewsByTitle(title: string, options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>> {
        throw Error()
    }

    async searchResearchByTitle(title: string, options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>> {
        throw Error()
    }

    async searchUserByUsername(username: string, options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>> {
        throw Error()
    }
}
