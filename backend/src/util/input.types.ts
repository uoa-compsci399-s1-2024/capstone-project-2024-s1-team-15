import { Article, ArticleType, IArticle, IUser, User } from "@aapc/types";
import { InputValidationError } from "./helper.types";

export interface IArticleIn extends Omit<IArticle, "id" | "lastEditedAt" | "publishedAt" | "publisher" | "articleType"> {}

export class ArticleIn implements IArticleIn {
    title: string;
    subtitle: string;
    content: string;
    media: string[];
    errors: InputValidationError<IArticleIn>[] = []

    checkMissing (obj: any, k: keyof IArticleIn): any {
        if (!(obj[k] === undefined)) {
            this.errors.push({
                field: k,
                message: `Required attribute ${String(k)} missing.`
            })
            return null
        } else {
            return obj[k]
        }
    }

    constructor (obj: any) {
        this.title = this.checkMissing(obj, "title")
        this.subtitle = this.checkMissing(obj, "subtitle")
        this.content = this.checkMissing(obj, "content")
        this.media = this.checkMissing(obj, "media")
        if (this.errors.length > 0) { throw new TypeError(JSON.stringify(this.errors))}
    }

    toArticle (articleType: ArticleType, publisher: User): Article {
        return new Article(
            {
                id: "abc", // TODO: implement id
                title: this.title,
                subtitle: this.subtitle,
                content: this.content,
                media: this.media,
                articleType: articleType,
                publisher: publisher,
                publishedAt: new Date().toISOString(),
                lastEditedAt: new Date().toISOString()
            }
        )
    }
}

export interface IUserIn extends Omit<IUser, "verified" | "registeredAt"> {
}
