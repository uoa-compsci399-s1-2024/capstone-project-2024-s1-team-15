import { Article, IArticle, IPaginator, Paginator } from "@aapc/types"
import { API_URI } from "@/app/lib/consts"
import { ArticleOut, Nullable, Result } from "@/app/lib/types"
import { FetchOptions, getHeaders } from "@/app/services/lib/util"
import { fail, success } from "@/app/lib/util";

export async function getResearchById(id: string, options?: FetchOptions): Promise<Nullable<IArticle>> {
    const response = await fetch(API_URI + `/content/research/${id}`, {
        method: "get",
        headers: getHeaders(options)
    })
    if (response.status === 404) {
        return null
    }
    return new Article(await response.json())
}

export async function getAllResearch(options?: FetchOptions): Promise<IPaginator<IArticle>> {
    const response = await fetch(API_URI + `/content/research/`, {
        method: "get",
        headers: getHeaders(options)
    })
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
    return success(new Article(await response.json()))
}