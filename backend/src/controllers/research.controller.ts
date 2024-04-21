import { RequestHandler } from "express";
import { DB } from "../repositories/repository";
import { BadRequestError, NotFoundError } from "../errors/HTTPErrors";
import { DEFAULT_PER_PAGE, DUMMY_USER } from "../util/const";
import { ArrayResult } from "../util/types/util.types";
import { Article, ArticleType, Paginator } from "@aapc/types";
import { ArticleIn } from "../util/types/input.types";

export default class ResearchController {
    static getResearch: RequestHandler = async (req, res, next) => {
        const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)

        // Get query parameter p from URL
        const page: number = Number(req.query.p ?? 1)

        // Get query parameter pp from URL
        const perPage = Number(req.query.pp ?? DEFAULT_PER_PAGE)

        const startFrom = (page - 1) * perPage
        const searchTitle = String(req.query.title ?? "")
        let r: ArrayResult<Article>
        if (searchTitle === "") {
            r = await DB.getAllResearch({ startFrom: startFrom, maxResults: perPage })
        } else {
            r = await DB.searchResearchByTitle(searchTitle, { startFrom: startFrom, maxResults: perPage })
        }
        const paginator = new Paginator(Article, {
            resultsPerPage: perPage,
            currentPage: page,
            totalResults: r.totalResults,
            data: r.results
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

    static getResearchById: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: string = String(req.params.id)

        const n = await DB.getResearchById(id)
        if (n === null) throw new NotFoundError(`Research article with id ${req.params.id} does not exist.`)
        res.json(n)
        next()
    }

    static createResearch: RequestHandler = async (req, res, next) => {
        // TODO: use auth headers to auto fill user
        try {
            const r = new ArticleIn(req.body).toArticle(ArticleType.research, DUMMY_USER)
            await DB.createResearch(r)
            res.json(r)
        } catch (e: any) {
            throw new BadRequestError(e.message)
        }
        next()
    }

    static editResearch: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: string = String(req.params.id)
        const currentArticle = await DB.getResearchById(id)
        if (currentArticle === null) throw new NotFoundError(`Research article with id ${id} does not exist.`)
        try {
            const r = new ArticleIn(req.body).toArticle(currentArticle.articleType, currentArticle.publisher)
            currentArticle.lastEditedAt = new Date().toISOString()
            currentArticle.title = r.title
            currentArticle.content = r.content
            currentArticle.subtitle = r.subtitle
            currentArticle.media = r.media
            await DB.editResearch(id, currentArticle)
            res.json(currentArticle)
        } catch (e: any) {
            throw new BadRequestError(e.message)
        }
        next()
    }

    static deleteResearch: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: string = String(req.params.id)
        try {
            await DB.deleteResearch(id)
        } catch (e) {
            throw new NotFoundError(`Research article with id ${req.params.id} does not exist.`)
        }
        res.status(204).send()
        next()
    }
}
