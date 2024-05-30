import { AuthCredential, AuthResponse, Result } from "@/app/lib/types"
import { API_URI } from "@/app/lib/consts"
import { fail, success } from "@/app/lib/util"
import { User } from "@aapc/types"
import { FetchOptions, getHeaders } from "./lib/util"

export async function login(credentials: AuthCredential): Promise<Result<AuthResponse>> {
    const res = await fetch(API_URI + "/auth/login", {
        method: "post",
        body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
        }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    if (res.status !== 200) {
        return fail((await res.json()).message)
    } else {
        const data = await res.json()
        return success({
            user: new User(data.user),
            token: data.token
        })
    }
}

export async function refreshToken(fetchOptions?: FetchOptions): Promise<Result<AuthResponse>> {
    const res = await fetch(API_URI + "/auth/refresh-token", {
        method: "post",
        headers: getHeaders(fetchOptions)
    })
    if (res.status !== 200) {
        return fail((await res.json()).message)
    } else {
        const data = await res.json()
        return success({
            user: new User(data.user),
            token: data.token
        })
    }
}

export async function changePassword(
    params: { username: string; currentPassword: string; newPassword: string },
    fetchOptions?: FetchOptions
): Promise<Result<null>> {
    const res = await fetch(`${API_URI}/auth/password`, {
        method: "put",
        body: JSON.stringify(params),
        headers: getHeaders(fetchOptions),
    })
    if (res.status !== 200) {
        return fail((await res.json()).message)
    } else {
        return success(null)
    }
}

export async function sendResetPasswordEmail(email: string, fetchOptions?: FetchOptions): Promise<Result<null>> {
    const res = await fetch(`${API_URI}/auth/forgot-password`, {
        method: "post",
        body: JSON.stringify({ email }),
        headers: getHeaders(fetchOptions),
    })

    if (res.status !== 200) {
        return fail((await res.json()).message)
    }

    return success(null)
}

export async function resetPassword(
    params: { email: string; newPassword: string; verificationCode: string },
    fetchOptions?: FetchOptions
): Promise<Result<null>> {
    const res = await fetch(`${API_URI}/auth/password`, {
        method: "post",
        body: JSON.stringify(params),
        headers: getHeaders(fetchOptions),
    })

    if (res.status !== 200) {
        return fail((await res.json()).message)
    }

    return success(null)
}
