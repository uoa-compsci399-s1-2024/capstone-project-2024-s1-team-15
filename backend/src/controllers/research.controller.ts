import { RequestHandler } from "express";
import { DB } from "../repositories/repository";

export const getAllResearch: RequestHandler = async (_, res, next) => {
    try {
        res.status(200).json(DB.getAllResearch())
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export const getResearchById: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json(DB.getResearchById(Number(req.params.id)))
    } catch (err) {
        console.error(err)
        next(err)
    }
}
