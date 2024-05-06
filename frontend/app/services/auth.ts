import { AuthCredential, AuthResponse, Result } from "@/app/lib/types"
import { API_URI } from "@/app/lib/consts"
import { fail, success } from "@/app/lib/util"
import { User } from "@aapc/types"

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
