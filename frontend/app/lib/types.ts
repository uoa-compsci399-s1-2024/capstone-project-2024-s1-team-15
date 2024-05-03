import { IUser, UserScope } from "@aapc/types"

export type FormState = {
    isValidInput?: boolean
    error?: string
}

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

type PrivilegedAccess = {
    allowedScopes?: UserScope[]
}

interface RouteConfig extends PrivilegedAccess {
    name?: string,
    description?: string,
    route?: string
}

export interface RouteConfigParent extends RouteConfig {
    children: (RouteConfigLeaf | RouteConfigParent)[]
}

export interface RouteConfigLeaf extends RouteConfig {
    route: string
}

export type JWTPayload = { username: string, scopes: UserScope[], iat: number }

export type Result<S> = SuccessResult<S> | FailureResult

export type Nullable<T> = null | T
