import User, { IUser } from "./User";

/**
 * An enum representing the two types of articles published to the website.
 */
export enum ArticleType {
    news, research
}

/**
 * An interface representing an article.
 */
export interface IArticle {
    id: string
    title: string
    subtitle: string
    content: string
    publisher: IUser
    articleType: ArticleType
    publishedAt: string
    lastEditedAt: string
    media: string[]
}

/**
 * A class representing an article.
 */
export default class Article implements IArticle {
    /**
     * The default constructor with no arguments.
     */
    constructor();

    /**
     * Overloaded constructor for instantiating an Article with a generic object.
     * @param obj - A partial object representing IArticle
     */
    constructor(obj: Partial<IArticle>);

    constructor(obj?: Partial<IArticle>) {
        this.id = obj?.id ?? ""
        this.title = obj?.title ?? "Default Title"
        this.articleType = obj?.articleType ?? ArticleType.news
        this.subtitle = obj?.subtitle ?? ""
        this.content = obj?.content ?? "Lorem Ipsum"
        this.publisher = new User(obj?.publisher ?? {})
        this.publishedAt = (obj?.publishedAt ? new Date(obj.publishedAt) : new Date()).toISOString()
        this.lastEditedAt = (obj?.lastEditedAt ? new Date(obj.lastEditedAt) : new Date()).toISOString()
        this.media = obj?.media ?? []
    }

    id: string
    title: string
    articleType: ArticleType
    content: string
    publisher: IUser
    subtitle: string
    publishedAt: string
    lastEditedAt: string
    media: string[]
}
