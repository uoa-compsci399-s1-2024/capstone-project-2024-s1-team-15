import { Article, ArticleType, IArticle, IUser, User } from "@aapc/types"
import { getRandomID } from "../functions"
import { ValidationError } from "@/errors/ValidationError"
import { ArticleSortFields } from "@/services/repository/memory/sorters/article.sorter"
import { UserSortFields } from "@/services/repository/memory/sorters/user.sorter"
import { DEFAULT_MAX_PER_PAGE, DEFAULT_PER_PAGE } from "@/util/const"
import Validator from "@/util/validation/validator"

// Interfaces for inputs

interface IArticleIn extends Omit<IArticle, "id" | "lastEditedAt" | "publishedAt" | "publisher" | "articleType"> {}

interface IUserIn extends Omit<IUser, "verified" | "registeredAt"> {}

interface ILoginIn {
    username: string
    password: string
}

interface IRegisterIn extends ILoginIn, IUserIn {}

interface IDeactivateIn {
    confirm: string
}

interface IChangePasswordIn {
    currentPassword: string
    newPassword: string
}

export interface IPaginatedQIn<T extends string> {
    p: number
    pp: number
    sortBy: T
    desc: boolean
}

interface IArticlePaginatedQIn extends IPaginatedQIn<ArticleSortFields> {
    t?: string
}

interface IUserPaginatedQIn extends IPaginatedQIn<UserSortFields> {
    un?: string
}

// Concrete Implementations

export class ArticleIn extends Validator<IArticleIn> implements IArticleIn {
    title: string
    subtitle: string
    content: string
    media: string[]

    constructor(obj: any) {
        super("body")

        this.title = this.checkMissing(obj, "title")
        this.subtitle = obj.subtitle ?? ""
        this.content = this.checkMissing(obj, "content")
        this.media = obj.media ?? []

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }

    toExistingArticle(article: IArticle): IArticle {
        article.title = this.title
        article.subtitle = this.subtitle === "" ? article.subtitle : this.subtitle
        article.content = this.content
        article.media = this.media.length === 0 ? article.media : this.media
        article.lastEditedAt = new Date().toISOString()
        return article
    }

    toNewArticle(articleType: ArticleType, publisher: IUser): IArticle {
        return new Article({
            id: getRandomID(), // TODO: implement id checks
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            media: this.media,
            articleType: articleType,
            publisher: publisher,
            publishedAt: new Date().toISOString(),
            lastEditedAt: new Date().toISOString(),
        })
    }
}

export class UserIn extends Validator<IUserIn> implements IUserIn {
    username: string
    email: string
    displayName: string

    constructor(obj: any) {
        super("body")

        this.username = this.checkMissing(obj, "username")
        this.email = this.checkMissing(obj, "email")
        this.displayName = this.checkMissing(obj, "displayName")

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }

    toExistingUser(user: IUser): IUser {
        user.email = this.email
        user.displayName = this.displayName
        return user
    }

    toNewUser(): IUser {
        return new User({
            username: this.username,
            email: this.email,
            displayName: this.displayName,
            verified: true, // TODO: set false when user verification is added
            registeredAt: new Date().toISOString(),
        })
    }
}

export class LoginIn extends Validator<ILoginIn> implements ILoginIn {
    username: string
    password: string

    constructor(obj: any) {
        super("body")

        this.username = this.checkMissing(obj, "username")
        this.password = this.checkMissing(obj, "password")

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class RegisterIn extends Validator<IRegisterIn> implements IRegisterIn {
    displayName: string
    email: string
    password: string
    username: string

    constructor(obj: any) {
        super("body")

        this.username = this.checkMissing(obj, "username")
        this.password = this.checkMissing(obj, "password")
        this.email = this.checkMissing(obj, "email")
        this.displayName = this.checkMissing(obj, "displayName")

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class DeactivateIn extends Validator<IDeactivateIn> implements IDeactivateIn {
    confirm: string

    constructor(obj: any) {
        super("body")

        this.confirm = this.checkMissing(obj, "confirm")

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ChangePasswordIn extends Validator<IChangePasswordIn> implements IChangePasswordIn {
    currentPassword: string
    newPassword: string

    constructor(obj: any) {
        super("body")

        this.currentPassword = this.checkMissing(obj, "currentPassword")
        this.newPassword = this.checkMissing(obj, "newPassword")

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ArticlePaginatedQIn extends Validator<IArticlePaginatedQIn> implements IArticlePaginatedQIn {
    desc: boolean
    p: number
    pp: number
    sortBy: ArticleSortFields
    t?: string

    constructor(obj: any) {
        super("query")

        this.desc = this.checkBoolean(obj, "desc") ?? true
        this.p = this.checkNumber(obj, "p") ?? 1
        this.pp = this.checkNumber(obj, "pp", 1, DEFAULT_MAX_PER_PAGE) ?? DEFAULT_PER_PAGE
        this.sortBy = obj["sortBy"] ?? "publishedAt"
        this.t = obj["t"] ?? undefined

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class UserPaginatedQIn extends Validator<IUserPaginatedQIn> implements IUserPaginatedQIn {
    desc: boolean
    p: number
    pp: number
    sortBy: UserSortFields
    un?: string

    constructor(obj: any) {
        super("query")

        this.desc = this.checkBoolean(obj, "desc") ?? true
        this.p = this.checkNumber(obj, "p") ?? 1
        this.pp = this.checkNumber(obj, "pp", 1, DEFAULT_MAX_PER_PAGE) ?? DEFAULT_PER_PAGE
        this.sortBy = obj["sortBy"] ?? "registeredAt"
        this.un = obj["un"] ?? undefined

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}
