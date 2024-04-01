import { RequestHandler } from "express";
import { DB } from "../repositories/repository";

export const getAllNews: RequestHandler = async (_, res, next) => {
    try {
        res.status(200).json(await DB.getAllNews())
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export const getNewsById: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json(await DB.getNewsById(Number(req.params.id)))
    } catch (err) {
        console.error(err)
        next(err)
    }
}
