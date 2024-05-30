import { ArticleType, IUser, UserScope } from "@aapc/types"

export type AuthCredential = {
    password: string,
    username: string
}

export type AuthResponse = {
    user: IUser,
    token: string
}

export type SuccessResult<T> = {
    success: true
    result: T
}

export type FailureResult = {
    success: false
    message: string
}

export type Result<S> = SuccessResult<S> | FailureResult

export type Nullable<T> = null | T

export type JWTPayload = { username: string, scopes: UserScope[], iat: number }

export type ArticleOut = {
    title: string
    subtitle?: string
    content: string
    articleType: ArticleType
    media?: string[]
}

export type UserOut = {
    displayName?: string
    email?: string
    iconSrc?: Nullable<string>
}
