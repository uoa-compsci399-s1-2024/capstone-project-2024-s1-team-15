import { Article, IArticle, IPaginator, Paginator } from "@aapc/types"
import { API_URI } from "@/app/lib/consts"
import { ArticleOut, Nullable, Result } from "@/app/lib/types"
import { FetchOptions, getHeaders } from "@/app/services/lib/util"
import { fail, success } from "@/app/lib/util";
import revalidateArticle from "./revalidator";


export async function getNewsById(id: string, options?: FetchOptions): Promise<Nullable<IArticle>> {
    const response = await fetch(API_URI + `/content/news/${id}`, {
        method: "get",
        headers: getHeaders(options),
        next: { tags: ["article"]}
    })
    if (response.status === 404) {
        return null
    }
    return new Article(await response.json())
}

export async function getAllNews(options?: FetchOptions): Promise<IPaginator<IArticle>> {
    const response = await fetch(API_URI + `/content/news/`, {
        method: "get",
        headers: getHeaders(options)
    })
    return new Paginator(Article, await response.json())
}

export async function publishNews(a: ArticleOut, options?: FetchOptions): Promise<Result<IArticle>> {
    const response = await fetch(API_URI + `/content/news`, {
        method: "post",
        headers: getHeaders(options),
        body: JSON.stringify(a)
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    return success(new Article(await response.json()))
}

export async function editNews(id: string, a: ArticleOut, options?: FetchOptions): Promise<Result<IArticle>> {
    const response = await fetch(API_URI + `/content/news/${id}`, {
        method: "put",
        headers: getHeaders(options),
        body: JSON.stringify(a)
    })
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    revalidateArticle()
    return success(new Article(await response.json()))
}
