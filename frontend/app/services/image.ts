import { FetchOptions, getHeaders } from "@/app/services/lib/util";
import { Result } from "@/app/lib/types";
import { ImageMetadata } from "@aapc/types";
import { API_URI } from "@/app/lib/consts";
import { fail, success } from "@/app/lib/util";

export async function uploadImage(image: File, options?: FetchOptions): Promise<Result<ImageMetadata>> {
    const formData = new FormData()
    formData.append("image", image, image.name)

    const headers = getHeaders(options)
    headers.delete("Content-Type")

    const response = await fetch(API_URI + "/image", {
        method: "post",
        headers: headers,
        body: formData
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    return success(new ImageMetadata(await response.json()))
}
