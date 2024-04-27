import { RequestHandler } from "express"
import { Article, ArticleType, Paginator } from "@aapc/types"
import { BadRequestError, NotFoundError } from "@/errors/HTTPErrors"
import { ArrayResult } from "@/util/types/util.types"
import { ArticleIn } from "@/util/types/input.types"
import { DEFAULT_PER_PAGE, DUMMY_USER } from "@/util/const"
import { DB } from "@/services/services"

export default class NewsController {
    static getNews: RequestHandler = async (req, res, next) => {
        const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`)

        // Get query parameter p from URL
        const page: number = Number(req.query.p ?? 1)

        // Get query parameter pp from URL
        const perPage = Number(req.query.pp ?? DEFAULT_PER_PAGE)

        const startFrom = (page - 1) * perPage
        const searchTitle = String(req.query.title ?? "")
        let r: ArrayResult<Article>
        if (searchTitle === "") {
            r = await DB.getAllNews({
                startFrom: startFrom,
                maxResults: perPage,
            })
        } else {
            r = await DB.searchNewsByTitle(searchTitle, {
                startFrom: startFrom,
                maxResults: perPage,
            })
        }
        const paginator = new Paginator(Article, {
            resultsPerPage: perPage,
            currentPage: page,
            totalResults: r.totalResults,
            data: r.results,
        })
        if (page < paginator.lastPage) {
            url.searchParams.set("p", String(page + 1))
            paginator.nextPageLocation = url.href
        }
        if (page > 1) {
            url.searchParams.set("p", String(page - 1))
            paginator.prevPageLocation = url.href
        }
        res.json(paginator)
        next()
    }

    static getNewsById: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: string = String(req.params.id)

        const a = await DB.getNewsById(id)
        if (a === null) throw new NotFoundError(`News article with id ${req.params.id} does not exist.`)
        res.json(a)
        next()
    }

    static createNews: RequestHandler = async (req, res, next) => {
        // TODO: use auth headers to auto fill user
        try {
            const n = new ArticleIn(req.body).toArticle(ArticleType.news, DUMMY_USER)
            await DB.createNews(n)
            res.status(201).send()
        } catch (e: any) {
            throw new BadRequestError(e.message)
        }
        next()
    }

    static editNews: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: string = String(req.params.id)
        const currentArticle = await DB.getNewsById(id)
        if (currentArticle === null) throw new NotFoundError(`News article with id ${id} does not exist.`)
        try {
            const n = new ArticleIn(req.body).toArticle(currentArticle.articleType, currentArticle.publisher)
            currentArticle.lastEditedAt = new Date().toISOString()
            currentArticle.title = n.title
            currentArticle.content = n.content
            currentArticle.subtitle = n.subtitle
            currentArticle.media = n.media
            await DB.editNews(id, currentArticle)
            res.status(204).send()
        } catch (e: any) {
            throw new BadRequestError(e.message)
        }
        next()
    }

    static deleteNews: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: string = String(req.params.id)
        try {
            await DB.deleteNews(id)
        } catch (e) {
            throw new NotFoundError(`News article with id ${id} does not exist.`)
        }
        res.status(204).send()
        next()
    }
}
