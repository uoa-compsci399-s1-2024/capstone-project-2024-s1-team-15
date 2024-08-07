import { Article, ArticleType, ImageFormat, ImageMetadata, PollenData, User } from "@aapc/types"
import { Collection, Db, Document, Filter, FindCursor, MongoClient, ServerApiVersion, WithId } from "mongodb"
import {
    ArrayResult,
    ArrayResultOptions,
    ArticleSortFields,
    ImageMetadataSortFields, Nullable,
    SortOptions,
    UserSortFields
} from "@/util/types/types"
import IRepository from "@/services/repository/repository.service"

export default class MongoRepository implements IRepository {
    private readonly db: Db
    private readonly articles: Collection
    private readonly users: Collection
    private readonly pollenData: Collection
    private readonly imageMetadata: Collection

    constructor(uri: string) {
        this.db = new MongoClient(uri, { serverApi: ServerApiVersion.v1 }).db("AAPC")
        this.articles = this.db.collection("Articles")
        this.users = this.db.collection("Users")
        this.pollenData = this.db.collection("PollenData")
        this.imageMetadata = this.db.collection("ImageMetadata")
    }

    private async fetchMongoDocuments(
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

    private async documentToArticle(d: WithId<Document>): Promise<Article> {
        const u = (await this.getUserByUsername(d.publisher)) ?? new User()
        const a = new Article(<object>d)
        a.publisher = u
        return a
    }

    private articleToDocument(a: Article): Promise<object> {
        const aObj = structuredClone(a) as any
        aObj.publisher = a.publisher.username
        return aObj
    }

    private async documentToImageMetadata(d: WithId<Document>): Promise<ImageMetadata> {
        const u = (await this.getUserByUsername(d.createdBy)) ?? new User()
        const format = ImageFormat[d.format as "jpg" | "png"]
        const im = new ImageMetadata(<object>d)
        im.createdBy = u
        im.format = format
        return im
    }

    private imageMetadataToDocument(im: ImageMetadata): Promise<object> {
        const imObj = structuredClone(im) as any
        imObj.createdBy = im.createdBy.username
        return imObj
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
        await this.articles.deleteOne({$and: [{$or: [{articleType: ArticleType.news},{articleType: ArticleType.news_external}]},{id: id}]})
    }

    async deleteResearch(id: string): Promise<void> {
        await this.articles.deleteOne({$and: [{$or: [{articleType: ArticleType.research},{articleType: ArticleType.research_external}]},{id: id}]})
    }

    async deleteUser(username: string): Promise<void> {
        await this.users.deleteOne({ username: username })
    }

    async editNews(id: string, a: Article): Promise<Article> {
        if (a.id !== id) {
            throw TypeError("Article ID does not match provided ID")
        }
        await this.articles.replaceOne(
            {
                id: id,
                $or: [{articleType: ArticleType.news}, {articleType: ArticleType.news_external} ],
            },
            this.articleToDocument(a)
        )
        return a
    }

    async editResearch(id: string, a: Article): Promise<Article> {
        if (a.id !== id) {
            throw TypeError("Article ID does not match provided ID")
        }
        await this.articles.replaceOne(
            {
                id: id,
                $or: [{articleType: ArticleType.research}, {articleType: ArticleType.research_external} ],
            },
            this.articleToDocument(a)
        )
        return a
    }

    async editUser(username: string, u: User): Promise<User> {
        await this.users.replaceOne({ username: username }, u)
        return u
    }

    async getNews(
        title?: string,
        publisher?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        const r: Article[] = []
        let q: Filter<any> = {
            $and: [{
                $or: [
                    { articleType: ArticleType.news },
                    { articleType: ArticleType.news_external }
                ]
            }]
        }
        if (title) {
            q.$and && q.$and.push({ title: new RegExp(`.*${title}.*`, "i") })
        }
        if (publisher) {
            q.$and && q.$and.push({ publisher: publisher })
        }
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

    async getNewsById(id: string): Promise<Nullable<Article>> {
        const n = await this.articles.findOne({ $and: [{ $or: [{ articleType: ArticleType.news }, { articleType: ArticleType.news_external }] }, { id: id }] })
        if (n === null) {
            return null
        }
        return await this.documentToArticle(n)
    }

    async getResearch(
        title?: string,
        publisher?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>> {
        const r: Article[] = []
        let q: Filter<any> = {
            $and: [{
                $or: [
                    { articleType: ArticleType.research },
                    { articleType: ArticleType.research_external }
                ]
            }]
        }
        if (title) {
            q.$and && q.$and.push({ title: new RegExp(`.*${title}.*`, "i") })
        }
        if (publisher) {
            q.$and && q.$and.push({ publisher: publisher })
        }
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

    async getResearchById(id: string): Promise<Nullable<Article>> {
        const r = await this.articles.findOne({ $and: [{ $or: [{ articleType: ArticleType.research }, { articleType: ArticleType.research_external }] }, { id: id }] })
        if (r === null) {
            return null
        }
        return await this.documentToArticle(r)
    }

    async getUsers(username?: string, options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>> {
        const r: User[] = []
        const q: Filter<any> = username? { username: new RegExp(`.*${username}.*`, "i") } : {}
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

    async getUserByUsername(username: string): Promise<Nullable<User>> {
        const u = await this.users.findOne({ username: username })
        if (u === null) {
            return null
        }
        return new User(<object>u)
    }

    async getUserByEmail(email: string): Promise<Nullable<User>> {
        const u = await this.users.findOne({ email: email })
        if (u === null) {
            return null
        }
        return new User(<object>u)
    }

    async getPollenDataset(): Promise<PollenData[]> {
        return (await this.pollenData.find().toArray()) as object[] as PollenData[]
    }

    async createPollenDataset(pollenData: PollenData[]): Promise<any> {
        await this.deletePollenDataset()

        await this.pollenData.insertMany(pollenData)
    }

    async deletePollenDataset(): Promise<any> {
        await this.pollenData.deleteMany()
    }

    async createImageMetadata(im: ImageMetadata): Promise<ImageMetadata> {
        await this.imageMetadata.insertOne(this.imageMetadataToDocument(im))
        return im
    }

    async getImageMetadataById(id: string): Promise<Nullable<ImageMetadata>> {
        const im = await this.imageMetadata.findOne({ id: id })
        if (im === null) {
            return null
        }
        return this.documentToImageMetadata(im)
    }

    async getImageMetadata(
        username?: Nullable<string>,
        options?: ArrayResultOptions<SortOptions<ImageMetadata, ImageMetadataSortFields>>
    ): Promise<ArrayResult<ImageMetadata>> {
        const a: ImageMetadata[] = []
        let rC: number = 0
        const q: Filter<any> = username !== undefined ? { createdBy: username } : {}
        if (username !== null) {
            rC = await this.imageMetadata.countDocuments(q)
            const result = await this.fetchMongoDocuments(this.imageMetadata.find(q), options)
            for (const document of result) {
                a.push(await this.documentToImageMetadata(document))
            }
        }
        return {
            totalResults: rC,
            results: a,
        }
    }

    async editImageMetadata(id: string, im: ImageMetadata): Promise<ImageMetadata> {
        await this.imageMetadata.replaceOne({ id: id }, this.imageMetadataToDocument(im))
        return im
    }

    async deleteImageMetadata(id: string): Promise<void> {
        await this.imageMetadata.deleteOne({ id: id })
    }
}
