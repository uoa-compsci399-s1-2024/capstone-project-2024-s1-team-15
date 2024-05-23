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

export async function changePassword(
    credentials: { username: string; currentPassword: string; newPassword: string },
    options?: FetchOptions
): Promise<any> {
    const res = await fetch(`${API_URI}/auth/password/${credentials.username}`, {
        method: "put",
        body: JSON.stringify(credentials),
        headers: getHeaders(options),
    })
    if (res.status !== 200) {
        return fail((await res.json()).message)
    } else {
        return success({})
    }
}

export async function sendResetPasswordEmail(
    credentials: { username: string },
    options?: FetchOptions
): Promise<Result<{ partiallyCensoredUserEmail: string }>> {
    const res = await fetch(`${API_URI}/auth/password/forgot/${credentials.username}`, {
        method: "post", // because it sends an email
        headers: getHeaders(options),
    })

    if (res.status !== 200) {
        return fail((await res.json()).message)
    } else {
        return success(await res.json())
    }
}
