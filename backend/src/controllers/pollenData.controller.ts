import { RequestHandler } from "express"
import { DB } from "@/services/services"

export default class PollenDataController {
    static getPollenData: RequestHandler = async (req, res, next) => {
        const pollenData = DB.getAllPollenData && (await DB.getAllPollenData())
        res.json(pollenData)
        next()
    }
}
