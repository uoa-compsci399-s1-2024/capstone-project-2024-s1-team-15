import { RequestHandler } from "express";
import { DB } from "../repositories/repository";
import { BadRequestError, NotFoundError } from "../errors/HTTPErrors";

export default class NewsController {
    static getAllNews: RequestHandler = async (req, res, next) => {
        res.json(await DB.getAllNews({ maxResults: 5, sort: { field: "publishedAt" }}))
    }

    static getNewsById: RequestHandler = async (req, res, next) => {
        if (!("id" in req.params)) throw new BadRequestError()
        const id: number = Number(req.params.id)
        if (isNaN(id)) throw new BadRequestError()

        const n = await DB.getNewsById(id)
        if (!n) throw new NotFoundError(`News article with id ${req.params.id} does not exist.`)

        res.json(await DB.getNewsById(id))
        next()
    }
}
