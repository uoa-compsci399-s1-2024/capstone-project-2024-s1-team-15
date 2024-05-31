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
            const permanentFilePath = path.join(__dirname, `../${STATIC_FILE_DIRECTORY}/permanent/${fileName}`)
            if (!fs.existsSync(permanentFilePath)) {
                throw new NotFoundError(`File ${fileName} not found.`)
            }
            res.sendFile(permanentFilePath)
        } else {
            res.sendFile(filePath)
        }
    }
}
