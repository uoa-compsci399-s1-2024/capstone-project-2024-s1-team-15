import { Article, ArticleType, IArticle, IUser, User, UserScope } from "@aapc/types"
import { getRandomID } from "../functions"
import { ValidationError } from "@/errors/ValidationError"
import Validator, { ValidatorWithPaginatedQIn } from "@/util/validation/validator"
import { ArticleSortFields, ImageMetadataSortFields, UserSortFields } from "@/util/types/types";

// Interfaces for inputs

interface IArticleIn extends Omit<IArticle, "id" | "lastEditedAt" | "publishedAt" | "publisher" | "articleType"> {}

interface INewUserIn extends Omit<IUser, "verified" | "registeredAt"> {}

interface IEditUserIn extends Omit<IUser, "verified" | "registeredAt" | "username" | "scopes"> {}

interface IEditUserScopeIn {
    scope: UserScope[]
}

interface ILoginIn {
    username: string
    password: string
}

interface IRegisterIn extends ILoginIn, Omit<INewUserIn, "scopes"> {}

interface IDeactivateIn {
    confirm: string
}

interface IChangePasswordIn {
    currentPassword: string
    newPassword: string
}

interface IForgotPasswordIn {
    email: string
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

interface IImageMetadataPaginatedQIn extends IPaginatedQIn<ImageMetadataSortFields> {
    createdBy?: string
}

interface IAddImageQIn {
    origin?: string
}

// Concrete Implementations

export class NewArticleIn extends Validator<IArticleIn> implements IArticleIn {
    title: string
    subtitle: string
    content: string
    articleType: ArticleType
    media: string[]

    constructor(obj: any) {
        super("body")

        this.title = this.checkMissing(obj, "title")
        this.subtitle = obj.subtitle ?? ""
        this.content = this.checkMissing(obj, "content")
        this.articleType = obj.articleType
        this.media = obj.media ?? []

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }

    toNewArticle(publisher: IUser): IArticle {
        return new Article({
            id: getRandomID(), // TODO: implement id checks
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            media: this.media,
            articleType: this.articleType,
            publisher: publisher,
            publishedAt: new Date().toISOString(),
            lastEditedAt: new Date().toISOString(),
        })
    }
}

export class EditArticleIn extends Validator<IArticleIn> implements IArticleIn {
    title: string
    subtitle: string
    content: string
    media: string[]

    constructor(obj: any) {
        super("body")

        this.title = obj.title ?? ""
        this.subtitle = obj.subtitle ?? ""
        this.content = obj.content ?? ""
        this.media = obj.media ?? []
    }

    toExistingArticle(article: IArticle): IArticle {
        article.title = this.title === "" ? article.title : this.title
        article.subtitle = this.subtitle === "" ? article.subtitle : this.subtitle
        article.content = this.content === "" ? article.content : this.content
        article.media = this.media.length === 0 ? article.media : this.media
        article.lastEditedAt = new Date().toISOString()
        return article
    }
}

export class NewUserIn extends Validator<INewUserIn> implements INewUserIn {
    username: string
    email: string
    displayName: string
    scopes: UserScope[]

    constructor(obj: any) {
        super("body")

        this.username = this.checkMissing(obj, "username")
        this.email = this.checkMissing(obj, "email")
        this.displayName = this.checkMissing(obj, "displayName")
        this.scopes = this.checkScopes(obj, "scopes") || [UserScope.user, UserScope.regular]

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }

    toNewUser(): IUser {
        return new User({
            username: this.username,
            email: this.email,
            displayName: this.displayName,
            verified: true, // TODO: set false when user verification is added
            registeredAt: new Date().toISOString(),
            scopes: this.scopes,
        })
    }
}

export class EditUserIn extends Validator<IEditUserIn> implements IEditUserIn {
    displayName: string
    email: string

    constructor(obj: any) {
        super("body")

        this.displayName = obj["displayName"] ?? ""
        this.email = obj["email"] ?? ""
    }

    toExistingUser(user: IUser): IUser {
        user.email = this.email === "" ? user.email : this.email
        user.displayName = this.displayName === "" ? user.displayName : this.displayName
        return user
    }
}

export class EditUserScopeIn extends Validator<IEditUserScopeIn> implements IEditUserScopeIn {
    scope: UserScope[]

    constructor(obj: any) {
        super("body")

        this.scope = this.checkMissing(obj, "scope")
        this.scope = this.checkScopes(obj, "scope") || []

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }

    toExistingUser(user: IUser): IUser {
        user.scopes = this.scope
        return user
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

export class ForgotPasswordIn extends Validator<IForgotPasswordIn> implements IForgotPasswordIn {
    email: string

    constructor(obj: any) {
        super("body")

        this.email = this.checkMissing(obj, "email")

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ArticlePaginatedQIn extends ValidatorWithPaginatedQIn<IArticlePaginatedQIn, ArticleSortFields> implements IArticlePaginatedQIn {
    t?: string

    constructor(obj: any) {
        super(obj, "publishedAt", true)

        this.t = obj["t"] ?? undefined

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class UserPaginatedQIn extends ValidatorWithPaginatedQIn<IUserPaginatedQIn, UserSortFields> implements IUserPaginatedQIn {
    un?: string

    constructor(obj: any) {
        super(obj, "registeredAt", true)
6
        this.un = obj["un"] ?? undefined

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ImageMetadataPaginatedQIn extends ValidatorWithPaginatedQIn<IImageMetadataPaginatedQIn, ImageMetadataSortFields> implements IImageMetadataPaginatedQIn {
    createdBy?: string

    constructor(obj: any) {
        super(obj, "createdAt")

        this.createdBy = obj["createdBy"] ?? undefined

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class AddImageQIn extends Validator<IAddImageQIn> implements IAddImageQIn {
    origin?: string

    constructor(obj: any) {
        super("query")

        this.origin = obj["origin"] ?? undefined

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}
