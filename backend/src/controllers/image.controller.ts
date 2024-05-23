import { RequestHandler } from "express"
import { BadRequestError } from "@/errors/HTTPErrors"
import { UploadedFile } from "express-fileupload"
import { ImageFormat, ImageMetadata, IUser } from "@aapc/types"
import { CDN, DB } from "@/services/services"
import { DEFAULT_IMAGE_ID_LENGTH } from "@/util/const";
import { getRandomID, validate } from "@/util/functions";
import sizeOf from "image-size"
import { AddImageQIn } from "@/util/validation/input.types";

export default class ImageController {
    static getOneImageMetadata: RequestHandler = async (req, res, next) => {
        next()
    }

    static getManyImageMetadata: RequestHandler = async (req, res, next) => {
        next()
    }

    static addImage: RequestHandler = async (req, res, next) => {
        if (!req.files || !req.files.image) throw new BadRequestError("An image was not included with the request.")
        const file = req.files.image as UploadedFile
        const query = validate(AddImageQIn, req.query)

        // Get Image Format
        let fileFormat: ImageFormat
        switch (file.name.split(".").at(-1)) {
            case "png": {
                fileFormat = ImageFormat.png
                break
            }
            case "jpeg": case "jpg": {
                fileFormat = ImageFormat.jpg
                break
            }
            default: {
                throw new BadRequestError("File is not a valid .png/.jpg/.jpeg image.")
            }
        }

        const fileContent = Buffer.from(file.data)

        const id = getRandomID(DEFAULT_IMAGE_ID_LENGTH)
        const dimensions = sizeOf(fileContent)
        const location = await CDN.putImage(fileContent, id, fileFormat)

        const im = new ImageMetadata({
            id: id,
            height: dimensions.height,
            width: dimensions.width,
            format: fileFormat,
            createdAt: new Date().toISOString(),
            createdBy: await DB.getUserByUsername(res.locals.username) as IUser,
            usages: query.origin? [query.origin] : [],
            src: location
        })
        res.json(im)
        next()
    }

    static editImageMetadata: RequestHandler = async (req, res, next) => {
        next()
    }

    static deleteImage: RequestHandler = async (req, res, next) => {
        next()
    }
}