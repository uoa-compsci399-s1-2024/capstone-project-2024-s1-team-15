import { FetchOptions, getHeaders, getSearchParams, PaginatedResultOptions } from "@/app/services/lib/util"
import { Result } from "@/app/lib/types"
import { IImageMetadata, ImageMetadata, IPaginator, Paginator } from "@aapc/types"
import { API_URI } from "@/app/lib/consts"
import { fail, success } from "@/app/lib/util"
import { revalidateImage } from "@/app/services/lib/revalidator";

export async function getImagesByUser(
    username: string,
    paginatedResultOptions?: PaginatedResultOptions<IImageMetadata>,
    fetchOptions?: FetchOptions
): Promise<Result<IPaginator<IImageMetadata>>> {
    const searchParams = getSearchParams(paginatedResultOptions)
    searchParams.append("createdBy", username)
    const response = await fetch(
        API_URI + `/image?` + searchParams,
        {
            method: "get",
            headers: getHeaders(fetchOptions),
            next: { tags: ["image"] }
        }
    )
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    return success(new Paginator(ImageMetadata, await response.json()))

}

export async function uploadImage(image: File, fetchOptions?: FetchOptions): Promise<Result<ImageMetadata>> {
    const formData = new FormData()
    formData.append("image", image, image.name)

    const headers = getHeaders(fetchOptions)
    headers.delete("Content-Type")

    const response = await fetch(API_URI + "/image", {
        method: "post",
        headers: headers,
        body: formData
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    await revalidateImage()
    return success(new ImageMetadata(await response.json()))
}

export async function deleteImage(id: string, fetchOptions?: FetchOptions): Promise<Result<null>> {
    const response = await fetch(API_URI + `/image/${id}`, {
        method: "delete",
        headers: getHeaders(fetchOptions)
    })
    if (response.status !== 204) {
        return fail((await response.json()).message)
    }
    await revalidateImage()
    return success(null)
}
