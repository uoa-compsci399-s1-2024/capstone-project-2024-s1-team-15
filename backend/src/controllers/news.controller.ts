import { RequestHandler } from "express"
import { Article, ArticleType, Paginator } from "@aapc/types"
import { BadRequestError, NotFoundError } from "@/errors/HTTPErrors"
import { ArrayResultOptions, SortOptions } from "@/util/types/types"
import { ArticleIn, ArticlePaginatedQIn } from "@/util/validation/input.types"
import { DUMMY_USER } from "@/util/const"
import { DB } from "@/services/services"
import { validate } from "@/util/functions"
import { ArticleSortFields } from "@/services/repository/memory/sorters/article.sorter"

export default class NewsController {
    static getNews: RequestHandler = async (req, res, next) => {
        const query = validate(ArticlePaginatedQIn, req.query)
        const options: ArrayResultOptions<SortOptions<Article, ArticleSortFields>> = {
            startFrom: (query.p - 1) * query.pp,
            maxResults: query.pp,
            sort: [{ field: query.sortBy, descending: query.desc }],
        }
        let r = query.t === undefined ? await DB.getAllNews(options) : await DB.searchNewsByTitle(query.t, options)
        const paginator = new Paginator(Article, {
            resultsPerPage: query.pp,
            currentPage: query.p,
            totalResults: r.totalResults,
            data: r.results,
        })
        const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`)
        if (query.p < paginator.lastPage) {
            url.searchParams.set("p", String(query.p + 1))
            paginator.nextPageLocation = url.href
        }
        if (query.p > 1) {
            url.searchParams.set("p", String(query.p - 1))
            paginator.prevPageLocation = url.href
        }
        res.status(200).json(paginator)
        next()
    }

    static getNewsById: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)
        const a = await DB.getNewsById(id)
        if (a === null) throw new NotFoundError(`News article with id ${req.params.id} does not exist.`)
        res.status(200).json(a)
        next()
    }

    static createNews: RequestHandler = async (req, res, next) => {
        const body = validate(ArticleIn, req.body)
        // TODO: use auth headers to auto fill user
        const n = body.toNewArticle(ArticleType.news, DUMMY_USER)
        await DB.createNews(n)
        res.location(`/content/news/${n.id}`)
        res.status(201).json(n).send()
        next()
    }

    static editNews: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)
        const currentArticle = await DB.getNewsById(id)
        if (currentArticle === null) throw new NotFoundError(`News article with id ${id} does not exist.`)
        const body = validate(ArticleIn, req.body)
        const n = body.toExistingArticle(currentArticle)
        try {
            await DB.editNews(id, n)
        } catch (e) {
            if (e instanceof TypeError) throw new BadRequestError(e.message)
            throw e
        }
        res.status(200).json(n).send()
        next()
    }

    static deleteNews: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)
        if ((await DB.getNewsById(id)) === null) throw new NotFoundError(`News article with id ${id} does not exist.`)
        await DB.deleteNews(id)
        res.status(204).send()
        next()
    }
}
