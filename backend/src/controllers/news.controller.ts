import { RequestHandler } from "express";
import { DB } from "../repositories/repository";
import { BadRequestError, NotFoundError } from "../errors/HTTPErrors";
import { Article, Paginator } from "@aapc/types";
import { DEFAULT_PER_PAGE } from "../util/const";
import { ArrayResult } from "../util/helper.types";

export default class NewsController {
    static getNews: RequestHandler = async (req, res, next) => {
        const perPage = Number(req.query.pp?? DEFAULT_PER_PAGE)
        const page: number = Number(req.query.p?? 1)
        const startFrom = (page - 1) * perPage
        const searchTitle = String(req.query.title?? "")
        let r: ArrayResult<Article>
        if (searchTitle === "") {
            r = await DB.getAllNews({ startFrom: startFrom, maxResults: perPage })
        } else {
            r = await DB.searchNewsByTitle(searchTitle, { startFrom: startFrom, maxResults: perPage })
        }
        const paginator = new Paginator(Article, {
            resultsPerPage: perPage,
            currentPage: page,
            totalResults: r.totalResults,
            data: r.results
        })
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
        res.json(req.body)
        // TODO: implement this
        next()
    }

    static editNews: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: string = String(req.params.id)

        res.json(id)
        // TODO: implement this
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
