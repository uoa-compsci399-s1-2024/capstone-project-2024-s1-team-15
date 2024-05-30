import { RequestHandler } from "express"
import { DB } from "@/services/services"

export default class PollenDataController {
    static getPollenData: RequestHandler = async (req, res, next) => {
        const pollenData = await DB.getPollenDataset()
        res.json(pollenData)
        next()
    }

    static createPollenData: RequestHandler = async (req, res, next) => {
        const pollenData = req.body
        await DB.createPollenDataset(pollenData)
        res.sendStatus(201)
        next()
    }

    static deletePollenData: RequestHandler = async (req, res, next) => {
        await DB.deletePollenDataset()
        res.sendStatus(204)
        next()
    }
}
