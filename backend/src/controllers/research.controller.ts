import { RequestHandler } from "express";
import { DB } from "../repositories/repository";
import { BadRequestError, NotFoundError } from "../errors/HTTPErrors";
import { DEFAULT_PER_PAGE } from "../util/const";
import { ArrayResult } from "../util/helper.types";
import { Article, Paginator } from "@aapc/types";

export default class ResearchController {
    static getResearch: RequestHandler = async (req, res, next) => {
        const perPage = Number(req.query.pp ?? DEFAULT_PER_PAGE)
        const page: number = Number(req.query.p ?? 1)
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
        res.json(req.body)
        // TODO: implement this
        next()
    }

    static editResearch: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: string = String(req.params.id)

        res.json(id)
        // TODO: implement this
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
