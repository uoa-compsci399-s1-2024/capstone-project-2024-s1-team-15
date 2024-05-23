import { Article, ArticleType, ImageMetadata, PollenData, User } from "@aapc/types"
import { Collection, Db, Document, Filter, FindCursor, MongoClient, ServerApiVersion, WithId } from "mongodb"
import {
    ArrayResult,
    ArrayResultOptions,
    ArticleSortFields,
    ImageMetadataSortFields,
    Nullable,
    SortOptions,
    UserSortFields
} from "@/util/types/types"
import IRepository from "@/services/repository/repository.service"

export default class MongoRepository implements IRepository {
    private readonly db: Db
    private readonly articles: Collection
    private readonly users: Collection
    private pollenData: Collection

    constructor(uri: string) {
        this.db = new MongoClient(uri, { serverApi: ServerApiVersion.v1 }).db("AAPC")
        this.articles = this.db.collection("Articles")
        this.users = this.db.collection("Users")
        this.pollenData = this.db.collection("PollenData")
    }

    async fetchMongoDocuments(
        f: FindCursor<WithId<Document>>,
        options?: ArrayResultOptions<SortOptions<any, string>>
    ): Promise<WithId<Document>[]> {
        const a: WithId<Document>[] = []
        if (options) {
            for await (const document of f.skip(options.startFrom ?? 0).limit(options.maxResults ?? Infinity)) {
                a.push(document)
            }
        } else {
            for await (const document of f) {
                a.push(document)
            }
        }
        return a
    }

    async documentToArticle(d: WithId<Document>): Promise<Article> {
        const u = (await this.getUserByUsername(d.publisher)) ?? new User()
        const a = new Article(<object>d)
        a.publisher = u
        return a
    }

    articleToDocument(a: Article): Promise<object> {
        const aObj = <any>a
        aObj.publisher = a.publisher.username
        return aObj
    }

    async createNews(a: Article): Promise<Article> {
        await this.articles.insertOne(this.articleToDocument(a))
        return a
    }

    async createResearch(a: Article): Promise<Article> {
        await this.articles.insertOne(this.articleToDocument(a))
        return a
    }

    async createUser(u: User): Promise<User> {
        await this.users.insertOne(u)
        return u
    }

    async deleteNews(id: string): Promise<void> {
        await this.articles.deleteOne({ id: id, articleType: ArticleType.news })
    }

    async deleteResearch(id: string): Promise<void> {
        await this.articles.deleteOne({
            id: id,
            articleType: ArticleType.research,
        })
    }

    async deleteUser(username: string): Promise<void> {
        await this.users.deleteOne({ username: username })
    }

    async editNews(id: string, a: Article): Promise<Article> {
        if (a.id !== id) {
            throw TypeError("Article ID does not match provided ID")
        }
        await this.articles.updateOne(
            {
                id: id,
                articleType: ArticleType.news,
            },
            this.articleToDocument(a)
        )
        return a
    }

    async editResearch(id: string, a: Article): Promise<Article> {
        if (a.id !== id) {
            throw TypeError("Article ID does not match provided ID")
        }
        await this.articles.updateOne(
            {
                id: id,
                articleType: ArticleType.research,
            },
            this.articleToDocument(a)
        )
        return a
    }

    async editUser(username: string, u: User): Promise<User> {
        await this.users.updateOne({ username: username }, u)
        return u
    }

    async getAllNews(
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        const r: Article[] = []
        const q: Filter<any> = {$or: [{articleType: ArticleType.news}, {articleType: ArticleType.news_external}]}
        const rC = await this.articles.countDocuments(q)
        const result = await this.fetchMongoDocuments(this.articles.find(q), options)
        for (const document of result) {
            r.push(await this.documentToArticle(document))
        }
        return {
            totalResults: rC,
            results: r,
        }
    }

    async getAllResearch(
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        const r: Article[] = []
        const q: Filter<any> = {$or: [{articleType: ArticleType.research}, {articleType: ArticleType.research_external}]}
        const rC = await this.articles.countDocuments(q)
        const result = await this.fetchMongoDocuments(this.articles.find(q), options)
        for (const document of result) {
            r.push(await this.documentToArticle(document))
        }
        return {
            totalResults: rC,
            results: r,
        }
    }

    async getAllNewsByUser(
        username: string,
        titleSearchInput?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ) {
        let q: Filter<any> = {
            $or: [{ articleType: ArticleType.news }, { articleType: ArticleType.news_external }],
            publisher: username,
        }

        if (titleSearchInput) {
            q.title = new RegExp(`.*${titleSearchInput}.*`, "i")
        }

        const r: Article[] = []
        const rC = await this.articles.countDocuments(q)
        const result = await this.fetchMongoDocuments(this.articles.find(q), options)
        for (const document of result) {
            r.push(await this.documentToArticle(document))
        }

        return { totalResults: rC, results: r }
    }

    async getAllResearchByUser(
        username: string,
        titleSearchInput?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ) {
        let q: Filter<any> = {
            $or: [{ articleType: ArticleType.research }, { articleType: ArticleType.research_external }],
            publisher: username,
        }

        if (titleSearchInput) {
            q.title = new RegExp(`.*${titleSearchInput}.*`, "i")
        }

        const r: Article[] = []
        const rC = await this.articles.countDocuments(q)
        const result = await this.fetchMongoDocuments(this.articles.find(q), options)
        for (const document of result) {
            r.push(await this.documentToArticle(document))
        }

        return { totalResults: rC, results: r }
    }

    async getAllUsers(options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>> {
        const r: User[] = []
        const rC = await this.users.countDocuments()
        const result = await this.fetchMongoDocuments(this.users.find(), options)
        for (const document of result) {
            r.push(new User(<object>document))
        }
        return {
            totalResults: rC,
            results: r,
        }
    }

    async getNewsById(id: string): Promise<Nullable<Article>> {
        const n = await this.articles.findOne({$and: [{$or: [{articleType: ArticleType.news},{articleType: ArticleType.news_external}]},{id: id}]})
        if (n === null) {
            return null
        }
        return await this.documentToArticle(n)
    }

    async getResearchById(id: string): Promise<Nullable<Article>> {
        const r = await this.articles.findOne({$and: [{$or: [{articleType: ArticleType.research},{articleType: ArticleType.research_external}]},{id: id}]})
        if (r === null) {
            return null
        }
        return await this.documentToArticle(r)
    }

    async getUserByUsername(username: string): Promise<Nullable<User>> {
        const u = await this.users.findOne({ username: username })
        if (u === null) {
            return null
        }
        return new User(<object>u)
    }

    async searchNewsByTitle(
        title: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        const r: Article[] = []
        const q: Filter<any> = {
            articleType: ArticleType.news,
            title: new RegExp(`.*${title}.*`, "i"),
        }
        const rC: number = await this.articles.countDocuments(q)
        const result = await this.fetchMongoDocuments(this.articles.find(q), options)
        for (const document of result) {
            r.push(await this.documentToArticle(document))
        }
        return {
            totalResults: rC,
            results: r,
        }
    }

    async searchResearchByTitle(
        title: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        const r: Article[] = []
        const q: Filter<any> = {
            articleType: ArticleType.research,
            title: new RegExp(`.*${title}.*`, "i"),
        }
        const rC: number = await this.articles.countDocuments(q)
        const result = await this.fetchMongoDocuments(this.articles.find(q), options)
        for (const document of result) {
            r.push(await this.documentToArticle(document))
        }
        return {
            totalResults: rC,
            results: r,
        }
    }

    async searchUserByUsername(
        username: string,
        options?: ArrayResultOptions<SortOptions<User, UserSortFields>>
    ): Promise<ArrayResult<User>> {
        const r: User[] = []
        const q: Filter<any> = { username: new RegExp(`.*${username}.*`, "i") }
        const rC = await this.users.countDocuments(q)
        const result = await this.fetchMongoDocuments(this.users.find(q), options)
        for (const document of result) {
            r.push(new User(<object>document))
        }
        return {
            totalResults: rC,
            results: r,
        }
    }

    async getPollenDataset(): Promise<PollenData[]> {
        return (await this.pollenData.find().toArray()) as object[] as PollenData[]
    }

    async deletePollenDataset(): Promise<any> {
        await this.pollenData.deleteMany()
    }

    async createPollenDataset(pollenData: PollenData[]): Promise<any> {
        await this.deletePollenDataset()

        await this.pollenData.insertMany(pollenData)
    }

    async createImageMetadata(im: ImageMetadata): Promise<ImageMetadata> {
        throw new Error("Method not implemented.")
    }

    async getOneImageMetadata(id: string): Promise<Nullable<ImageMetadata>> {
        throw new Error("Method not implemented.")
    }

    async getManyImageMetadata(
        username?: string,
        options?: ArrayResultOptions<SortOptions<ImageMetadata, ImageMetadataSortFields>>
    ): Promise<ArrayResult<ImageMetadata>> {
        throw new Error("Method not implemented.")
    }

    async editImageMetadata(id: string, im: ImageMetadata): Promise<ImageMetadata> {
        throw new Error("Method not implemented.")
    }

    async deleteImageMetadata(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }
}
