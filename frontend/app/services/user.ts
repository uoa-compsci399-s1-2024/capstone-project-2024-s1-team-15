import { Result, UserOut } from "@/app/lib/types";
import { FetchOptions, getHeaders } from "@/app/services/lib/util";
import { IUser, User } from "@aapc/types";
import { API_URI } from "@/app/lib/consts";
import { fail, success } from "@/app/lib/util";

export async function editUser(username: string, u: UserOut, options?: FetchOptions): Promise<Result<IUser>> {
    const response = await fetch(API_URI + `/user/${username}`, {
        method: "put",
        headers: getHeaders(options),
        body: JSON.stringify(u)
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    return success(new User(await response.json()))
}
