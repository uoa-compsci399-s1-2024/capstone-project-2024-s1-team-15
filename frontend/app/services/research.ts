import { Article, IArticle, IPaginator, Paginator } from "@aapc/types"
import { API_URI } from "@/app/lib/consts"
import { ArticleOut, Nullable, Result } from "@/app/lib/types"
import { FetchOptions, getHeaders } from "@/app/services/lib/util"
import { fail, success } from "@/app/lib/util";
import { revalidateNews, revalidateResearch } from "./lib/revalidator";

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

export async function getAllResearch(
    searchTerm: string,
    pageNumber = 1,
    options?: FetchOptions
): Promise<IPaginator<IArticle>> {
    const response = await fetch(
        API_URI + `/content/research?` + new URLSearchParams({ t: searchTerm, p: pageNumber.toString() }),
        {
            method: "get",
            headers: getHeaders(options),
            next: { tags: ["research"] },
        }
    )
    return new Paginator(Article, await response.json())
}

export async function getResearchByUser(
    username: string,
    searchInput?: string,
    options?: FetchOptions
): Promise<IPaginator<IArticle>> {
    const response = await fetch(
        `${API_URI}/content/research/by-user/${username}?` + new URLSearchParams({ t: searchInput || "", pp: "100" }),
        {
            method: "get",
            headers: getHeaders(options),
        }
    )
    return new Paginator(Article, await response.json())
}

export async function publishResearch(a: ArticleOut, options?: FetchOptions): Promise<Result<IArticle>> {
    const response = await fetch(API_URI + `/content/research`, {
        method: "post",
        headers: getHeaders(options),
        body: JSON.stringify(a)
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    await revalidateResearch()
    return success(new Article(await response.json()))
}

export async function editResearch(id: string, a: ArticleOut, options?: FetchOptions): Promise<Result<IArticle>> {
    const response = await fetch(API_URI + `/content/research/${id}`, {
        method: "put",
        headers: getHeaders(options),
        body: JSON.stringify(a)
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    await revalidateResearch()
    return success(new Article(await response.json()))
}

export async function deleteResearch(id: string, options?: FetchOptions): Promise<Result<null>> {
    const response = await fetch(API_URI + `/content/research/${id}`, {
        method: "delete",
        headers: getHeaders(options),
    })
    if (response.status !== 204) {
        return fail((await response.json()).message)
    }
    await revalidateNews()
    return success(null)
}
