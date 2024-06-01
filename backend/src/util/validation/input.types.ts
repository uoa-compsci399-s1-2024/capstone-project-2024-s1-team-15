import { Article, ArticleType, IArticle, IUser, User, UserScope } from "@aapc/types"
import { getRandomID } from "../functions"
import { ValidationError } from "@/errors/ValidationError"
import Validator, { ValidatorWithPaginatedQIn } from "@/util/validation/validator"
import { ArticleSortFields, ImageMetadataSortFields, UserSortFields } from "@/util/types/types";

// Interfaces for inputs

interface IArticleIn extends Omit<IArticle, "id" | "lastEditedAt" | "publishedAt" | "publisher"> {}

interface IEditArticleIn extends Partial<Omit<IArticleIn, "articleType">> {}

interface INewUserIn extends Omit<IUser, "verified" | "registeredAt" | "iconSrc"> {}

interface IEditUserIn extends Partial<Omit<IUser, "verified" | "registeredAt" | "username" | "scopes">> {}

interface IEditUserScopeIn {
    scope: UserScope[]
}

interface ILoginIn {
    username: string
    password: string
}

interface IRegisterIn extends ILoginIn, Omit<INewUserIn, "scopes"> {}

interface IConfirmRegisterIn {
    username: string
    confirmationCode: string
}

interface IChangePasswordIn {
    currentPassword: string
    newPassword: string
}

interface IInitiateResetPasswordIn {
    email: string
}

interface IResetPasswordIn {
    email: string
    verificationCode: string
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
    publisher?: string
}

interface IUserPaginatedQIn extends IPaginatedQIn<UserSortFields> {
    un?: string
}

interface IImageMetadataPaginatedQIn extends IPaginatedQIn<ImageMetadataSortFields> {
    createdBy?: string
}

interface IAddImageQIn {
    origin?: string
    alt?: string
}

interface IContactIn {
    email: string
    name: string
    message: string
    recaptchaToken: string
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

        this.title = String(this.checkMissing(obj, "title"))
        this.subtitle = String(obj.subtitle ?? "")
        this.content = String(this.checkMissing(obj, "content"))
        this.articleType = obj.articleType
        this.media = this.checkArray(obj, "media") || []

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }

    toNewArticle(publisher: IUser): IArticle {
        const time = new Date().toISOString()
        return new Article({
            id: getRandomID(),  // TODO: implement id checks
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            media: this.media,
            articleType: this.articleType,
            publisher: publisher,
            publishedAt: time,
            lastEditedAt: time,
        })
    }
}

export class EditArticleIn extends Validator<IArticleIn> implements IEditArticleIn {
    title?: string
    subtitle?: string
    content?: string
    media?: string[]

    constructor(obj: any) {
        super("body")

        this.title = obj.title && String(obj.title)
        this.subtitle = obj.subtitle && String(obj.subtitle)
        this.content = obj.content && String(obj.content)
        this.media = this.checkArray(obj, "media")

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }

    toExistingArticle(article: IArticle): IArticle {
        article.title = this.title === undefined ? article.title : this.title
        article.subtitle = this.subtitle === undefined ? article.subtitle : this.subtitle
        article.content = this.content === undefined ? article.content : this.content
        article.media = this.media === undefined ? article.media : this.media
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

        this.username = String(this.checkMissing(obj, "username"))
        this.email = String(this.checkMissing(obj, "email"))
        this.displayName = String(this.checkMissing(obj, "displayName"))
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
            verified: true,  // TODO: set false when user verification is added
            registeredAt: new Date().toISOString(),
            scopes: this.scopes,
            iconSrc: null
        })
    }
}

export class EditUserIn extends Validator<IEditUserIn> implements IEditUserIn {
    displayName?: string
    email?: string
    iconSrc?: string | null

    constructor(obj: any) {
        super("body")

        this.displayName = obj.displayName && String(obj.displayName)
        this.email = obj.email && String(obj.email)
        this.iconSrc = obj.iconSrc && String(obj.iconSrc)
    }

    toExistingUser(user: IUser): IUser {
        user.email = this.email === undefined ? user.email : this.email
        user.displayName = this.displayName === undefined ? user.displayName : this.displayName
        user.iconSrc = this.iconSrc === undefined ? user.iconSrc : this.iconSrc
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

        this.username = String(this.checkMissing(obj, "username"))
        this.password = String(this.checkMissing(obj, "password"))

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

        this.username = String(this.checkMissing(obj, "username"))
        this.password = String(this.checkMissing(obj, "password"))
        this.email = String(this.checkMissing(obj, "email"))
        this.displayName = String(this.checkMissing(obj, "displayName"))

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ConfirmRegisterIn extends Validator<IConfirmRegisterIn> implements IConfirmRegisterIn {
    confirmationCode: string
    username: string

    constructor(obj: any) {
        super("body")

        this.username = String(this.checkMissing(obj, "username"))
        this.confirmationCode = String(this.checkMissing(obj, "confirmationCode"))

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

        this.currentPassword = String(this.checkMissing(obj, "currentPassword"))
        this.newPassword = String(this.checkMissing(obj, "newPassword"))

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class InitiateResetPasswordIn extends Validator<IInitiateResetPasswordIn> implements IInitiateResetPasswordIn {
    email: string

    constructor(obj: any) {
        super("body")
        this.email = String(this.checkMissing(obj, "email"))

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ResetPasswordIn extends Validator<IResetPasswordIn> implements IResetPasswordIn {
    email: string
    newPassword: string
    verificationCode: string

    constructor(obj: any) {
        super("body")

        this.email = String(this.checkMissing(obj, "email"))
        this.newPassword = String(this.checkMissing(obj, "newPassword"))
        this.verificationCode = String(this.checkMissing(obj, "verificationCode"))

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ArticlePaginatedQIn extends ValidatorWithPaginatedQIn<IArticlePaginatedQIn, ArticleSortFields> implements IArticlePaginatedQIn {
    t?: string
    publisher?: string

    constructor(obj: any) {
        super(obj, "publishedAt", true)

        this.t = obj.t && String(obj.t)
        this.publisher = obj.publisher && String(obj.publisher)

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class UserPaginatedQIn extends ValidatorWithPaginatedQIn<IUserPaginatedQIn, UserSortFields> implements IUserPaginatedQIn {
    un?: string

    constructor(obj: any) {
        super(obj, "registeredAt", true)

        this.un = obj.un && String(obj.un)

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ImageMetadataPaginatedQIn extends ValidatorWithPaginatedQIn<IImageMetadataPaginatedQIn, ImageMetadataSortFields> implements IImageMetadataPaginatedQIn {
    createdBy?: string

    constructor(obj: any) {
        super(obj, "createdAt")

        this.createdBy = obj.createdBy && String(obj.createdBy)

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class AddImageQIn extends Validator<IAddImageQIn> implements IAddImageQIn {
    origin?: string
    alt?: string

    constructor(obj: any) {
        super("query")

        this.origin = obj.origin && String(obj.origin)
        this.alt = obj.alt && String(obj.alt)

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}

export class ContactIn extends Validator<IContactIn> implements IContactIn {
    email: string
    message: string
    name: string
    recaptchaToken: string

    constructor(obj: any) {
        super("body")

        this.email = String(this.checkMissing(obj, "email"))
        this.message = String(this.checkMissing(obj, "message"))
        this.name = String(this.checkMissing(obj, "name"))
        this.recaptchaToken = String(this.checkMissing(obj, "recaptchaToken"))

        if (this.errors.length > 0) {
            throw new ValidationError(this.errors)
        }
    }
}
