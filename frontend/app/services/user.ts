import { Result, UserOut } from "@/app/lib/types"
import { FetchOptions, getHeaders } from "@/app/services/lib/util"
import { IUser, User } from "@aapc/types"
import { API_URI } from "@/app/lib/consts"
import { fail, success } from "@/app/lib/util"
import { revalidateUser } from "@/app/services/lib/revalidator";

interface IPublicUser extends Omit<IUser, "email" | "scopes" | "verified"> {}

export async function getUserByUsername(username: string, fetchOptions?: FetchOptions): Promise<Result<IPublicUser>> {
    const response = await fetch(API_URI + `/user/${username}`, {
        method: "get",
        headers: getHeaders(fetchOptions),
        next: { tags: ["user"] }
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    return success(await response.json() as IPublicUser)
}

export async function editUser(username: string, u: UserOut, fetchOptions?: FetchOptions): Promise<Result<IUser>> {
    const response = await fetch(API_URI + `/user/${username}`, {
        method: "put",
        headers: getHeaders(fetchOptions),
        body: JSON.stringify(u)
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    await revalidateUser()
    return success(new User(await response.json()))
}
