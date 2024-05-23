import { RequestHandler } from "express"
import { BadRequestError, UnauthorizedError } from "@/errors/HTTPErrors"
import { UploadedFile } from "express-fileupload"
import { ImageFormat, ImageMetadata } from "@aapc/types"
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

        const createdBy = await DB.getUserByUsername(res.locals.username)
        if (!createdBy) throw new UnauthorizedError("Invalid username.")

        // Get Unique ID
        let id: string
        do {
            id = getRandomID(DEFAULT_IMAGE_ID_LENGTH)
        } while (await DB.getOneImageMetadata(id) !== null)

        const dimensions = sizeOf(fileContent)
        const size = fileContent.byteLength
        const location = await CDN.putImage(fileContent, id, fileFormat)

        const im = new ImageMetadata({
            id: id,
            height: dimensions.height,
            width: dimensions.width,
            size: size,
            format: fileFormat,
            createdAt: new Date().toISOString(),
            createdBy: createdBy,
            usages: query.origin? [query.origin] : [],
            src: location
        })

        res.location(`/image/${im.id}`)
        res.status(201).json(im).send()
        next()
    }

    static editImageMetadata: RequestHandler = async (req, res, next) => {
        next()
    }

    static deleteImage: RequestHandler = async (req, res, next) => {
        next()
    }
}