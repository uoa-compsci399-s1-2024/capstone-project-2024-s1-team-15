import { RequestHandler } from "express"
import { Article } from "@aapc/types"
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/errors/HTTPErrors"
import { ArrayResultOptions, ArticleSortFields, SortOptions } from "@/util/types/types"
import { NewArticleIn, EditArticleIn, ArticlePaginatedQIn } from "@/util/validation/input.types"
import { DB } from "@/services/services"
import { getPaginator, validate } from "@/util/functions"

export default class NewsController {
    static getNews: RequestHandler = async (req, res, next) => {
        const query = validate(ArticlePaginatedQIn, req.query)
        const options: ArrayResultOptions<SortOptions<Article, ArticleSortFields>> = {
            startFrom: (query.p - 1) * query.pp,
            maxResults: query.pp,
            sort: [{ field: query.sortBy, descending: query.desc }],
        }
        let n = query.t === undefined ? await DB.getAllNews(options) : await DB.searchNewsByTitle(query.t, options)
        res.status(200)
            .json(getPaginator(Article, req, n, query.p, query.pp))
            .send()
        next()
    }

    static getNewsById: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)
        const a = await DB.getNewsById(id)
        if (a === null) throw new NotFoundError(`News article with id ${id} does not exist.`)
        res.status(200).json(a).send()
        next()
    }

    static getAllNewsByUser: RequestHandler = async (req, res, next) => {
        const username: string = String(req.params.username)
        const query = validate(ArticlePaginatedQIn, req.query)

        const options: ArrayResultOptions<SortOptions<Article, ArticleSortFields>> = {
            startFrom: (query.p - 1) * query.pp,
            maxResults: query.pp,
            sort: [{ field: query.sortBy, descending: query.desc }],
        }

        let r = await DB.getAllNewsByUser(username, query.t, options)

        res.status(200)
            .json(getPaginator(Article, req, r, query.p, query.pp))
            .send()
        next()
    }

    static createNews: RequestHandler = async (req, res, next) => {
        const body = validate(NewArticleIn, req.body)
        const publisher = await DB.getUserByUsername(res.locals.username)
        if (!publisher) throw new UnauthorizedError("Invalid username.")
        const n = body.toNewArticle(publisher)
        await DB.createNews(n)
        res.location(`/content/news/${n.id}`)
        res.status(201).json(n).send()
        next()
    }

    static editNews: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)
        const currentArticle = await DB.getNewsById(id)
        if (currentArticle === null) throw new NotFoundError(`News article with id ${id} does not exist.`)
        const body = validate(EditArticleIn, req.body)
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
