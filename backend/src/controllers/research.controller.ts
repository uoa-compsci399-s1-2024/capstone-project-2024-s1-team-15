import { RequestHandler } from "express"
import { Article } from "@aapc/types"
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/errors/HTTPErrors"
import { ArrayResultOptions, ArticleSortFields, SortOptions } from "@/util/types/types"
import { NewArticleIn, EditArticleIn, ArticlePaginatedQIn } from "@/util/validation/input.types"
import { DB } from "@/services/services"
import { getPaginator, validate } from "@/util/functions"

export default class ResearchController {
    static getResearch: RequestHandler = async (req, res, next) => {
        const query = validate(ArticlePaginatedQIn, req.query)
        const options: ArrayResultOptions<SortOptions<Article, ArticleSortFields>> = {
            startFrom: (query.p - 1) * query.pp,
            maxResults: query.pp,
            sort: [{ field: query.sortBy, descending: query.desc }],
        }
        let r = await DB.getResearch(query.t, query.publisher, options)
        res.status(200).json(getPaginator(Article, req, r, query.p, query.pp))
        next()
    }

    static getResearchById: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)
        const a = await DB.getResearchById(id)
        if (a === null) throw new NotFoundError(`Research article with id ${req.params.id} does not exist.`)
        res.status(200).json(a)
        next()
    }

    static createResearch: RequestHandler = async (req, res, next) => {
        const body = validate(NewArticleIn, req.body)
        const publisher = await DB.getUserByUsername(res.locals.username)
        if (!publisher) throw new UnauthorizedError("Invalid username.")
        const n = body.toNewArticle(publisher)
        await DB.createResearch(n)
        res.location(`/content/research/${n.id}`)
        res.status(201).json(n)
        next()
    }

    static editResearch: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)
        const currentArticle = await DB.getResearchById(id)
        if (currentArticle === null) throw new NotFoundError(`Research article with id ${id} does not exist.`)
        const body = validate(EditArticleIn, req.body)
        const n = body.toExistingArticle(currentArticle)
        try {
            await DB.editResearch(id, n)
        } catch (e) {
            if (e instanceof TypeError) throw new BadRequestError(e.message)
            throw e
        }
        res.status(200).json(n)
        next()
    }

    static deleteResearch: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)
        if ((await DB.getResearchById(id)) === null)
            throw new NotFoundError(`Research article with id ${id} does not exist.`)
        await DB.deleteResearch(id)
        res.sendStatus(204)
        next()
    }
}
