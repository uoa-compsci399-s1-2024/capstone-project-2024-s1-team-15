import { IUser } from "@aapc/types";

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



export type Result<S> = SuccessResult<S> | FailureResult

export type Nullable<T> = null | T
