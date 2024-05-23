import { RequestHandler } from "express";
import * as path from "path";
import * as fs from "fs";
import { NotFoundError } from "@/errors/HTTPErrors";
import { STATIC_FILE_DIRECTORY } from "@/util/const";

export default class StaticController {
    static getStaticContent: RequestHandler = async (req, res) => {
        const fileName = String(req.params.name)
        const filePath = path.join(__dirname, `../${STATIC_FILE_DIRECTORY}/${fileName}`)

        if (!fs.existsSync(filePath)) {
            throw new NotFoundError(`File ${fileName} not found.`)
        }

        res.sendFile(filePath)
    }
}
