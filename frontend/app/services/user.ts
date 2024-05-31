import { Result, UserOut } from "@/app/lib/types"
import { FetchOptions, getHeaders, getSearchParams, PaginatedResultOptions } from "@/app/services/lib/util"
import { IPaginator, IUser, Paginator, User, UserScope } from "@aapc/types"
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

export async function getUsers(
    username?: string,
    paginatorOptions?: PaginatedResultOptions<IUser>,
    fetchOptions?: FetchOptions
): Promise<Result<IPaginator<IUser>>> {
    const searchParams = getSearchParams(paginatorOptions)
    if (username) searchParams.append("un", username)
    const response = await fetch(API_URI + "/user?" + searchParams, {
        method: "get",
        headers: getHeaders(fetchOptions),
        next: { tags: ["user"] }
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    return success(new Paginator(User, await response.json()))
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

export async function editUserScope(username: string, scopeList: UserScope[], fetchOptions?: FetchOptions): Promise<Result<IUser>> {
    const response = await fetch(API_URI + `/user/${username}/scope`, {
        method: "put",
        headers: getHeaders(fetchOptions),
        body: JSON.stringify({ scope: scopeList })
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    await revalidateUser()
    return success(new User(await response.json()))
}
