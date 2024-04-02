import { RequestHandler } from "express";
import { DB } from "../repositories/repository";
import { BadRequestError, NotFoundError } from "../errors/HTTPErrors";

export default class ResearchController {
    static getAllResearch: RequestHandler = async (req, res, next) => {
        res.json(await DB.getAllResearch({ maxResults: 5, sort: { field: "publishedAt" } }))
    }

    static getResearchById: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: number = Number(req.params.id)
        if (isNaN(id)) throw new BadRequestError()

        const n = await DB.getResearchById(id)
        if (!n) throw new NotFoundError(`Research article with id ${req.params.id} does not exist.`)

        res.json(await DB.getResearchById(id))
        next()
    }
}
