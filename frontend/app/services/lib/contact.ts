import { API_URI } from "@/app/lib/consts"
import { FetchOptions, getHeaders } from "@/app/services/lib/util"
import { fail, success } from "@/app/lib/util"
import { Nullable, Result } from "@/app/lib/types"

export type ContactPayload = {
    name: string,
    email: string,
    message: string,
    recaptchaToken: Nullable<string>
}

export async function contact(payload: ContactPayload, fetchOptions?: FetchOptions): Promise<Result<null>> {
    const response = await fetch(`${API_URI}/contact-aapc`, {
        method: "post",
        body: JSON.stringify(payload),
        headers: getHeaders(fetchOptions),
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    return success(null)
}
