import { Article, IArticle, IPaginator, Paginator } from "@aapc/types"
import { ArticleOut, Nullable, Result } from "@/app/lib/types"
import { fail, success } from "@/app/lib/util"
import { API_URI } from "@/app/lib/consts"
import { FetchOptions, getHeaders, getSearchParams, PaginatedResultOptions } from "@/app/services/lib/util"
import { revalidateResearch } from "@/app/services/lib/revalidator"

export async function getResearchById(id: string, options?: FetchOptions): Promise<Nullable<IArticle>> {
    const response = await fetch(API_URI + `/content/research/${id}`, {
        method: "get",
        headers: getHeaders(options),
        next: { tags: ["research"]}
    })
    if (response.status === 404) {
        return null
    }
    return new Article(await response.json())
}

export async function getResearch(
    searchTerm?: string,
    publisher?: string,
    paginatorOptions?: PaginatedResultOptions<Article>,
    fetchOptions?: FetchOptions
): Promise<IPaginator<IArticle>> {
    const searchParams = getSearchParams(paginatorOptions)
    if (searchTerm) searchParams.append("t", searchTerm)
    if (publisher) searchParams.append("publisher", publisher)

    const response = await fetch(API_URI + `/content/research?` + searchParams, {
        method: "get",
        headers: getHeaders(fetchOptions),
        next: { tags: ["research"] },
    })

    return new Paginator(Article, await response.json())
}

export async function publishResearch(article: ArticleOut, fetchOptions?: FetchOptions): Promise<Result<IArticle>> {
    const response = await fetch(API_URI + `/content/research`, {
        method: "post",
        headers: getHeaders(fetchOptions),
        body: JSON.stringify(article)
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    await revalidateResearch()
    return success(new Article(await response.json()))
}

export async function editResearch(id: string, a: ArticleOut, fetchOptions?: FetchOptions): Promise<Result<IArticle>> {
    const response = await fetch(API_URI + `/content/research/${id}`, {
        method: "put",
        headers: getHeaders(fetchOptions),
        body: JSON.stringify(a)
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    await revalidateResearch()
    return success(new Article(await response.json()))
}

export async function deleteResearch(id: string, fetchOptions?: FetchOptions): Promise<Result<null>> {
    const response = await fetch(API_URI + `/content/research/${id}`, {
        method: "delete",
        headers: getHeaders(fetchOptions),
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    await revalidateResearch()
    return success(null)
}
