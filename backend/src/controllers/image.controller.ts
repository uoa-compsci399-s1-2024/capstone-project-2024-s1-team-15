import { RequestHandler } from "express"
import { UploadedFile } from "express-fileupload"
import sizeOf from "image-size"
import { ImageFormat, ImageMetadata } from "@aapc/types"
import Scope from "@/middleware/Auth"
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/errors/HTTPErrors"
import { CDN, DB } from "@/services/services"
import { DEFAULT_IMAGE_ID_LENGTH, SCOPES } from "@/util/const"
import { getPaginator, getRandomID, validate } from "@/util/functions"
import { AddImageQIn, ImageMetadataPaginatedQIn } from "@/util/validation/input.types"
import { ArrayResultOptions, ImageMetadataSortFields, Nullable, SortOptions } from "@/util/types/types"

export default class ImageController {
    static getImageMetadata: RequestHandler = async (req, res, next) => {
        const id = String(req.params.id)

        const im = await DB.getImageMetadataById(id)
        const isAdmin = Scope.scopeContainsAny(res.locals.userScopes, SCOPES.admin)
        if (im === null || (im.createdBy.username !== res.locals.username && !isAdmin)) {
            throw new NotFoundError(`Image with id ${id} does not exist.`)
        }

        res.status(200).json(im).send()
        next()
    }

    static getImageMetadataCreatedBy: RequestHandler = async (req, res, next) => {
        const query = validate(ImageMetadataPaginatedQIn, req.query)
        const isAdmin = Scope.scopeContainsAny(res.locals.userScopes, SCOPES.admin)

        // Behaviors:
        //   - IF request user is admin:
        //     - IF query.createdBy is not defined: return all
        //     - IF query.createdBy is defined: return all createdBy query.username
        //   - IF request user is not admin:
        //     - IF query.createdBy is not defined: return all createdBy request user
        //     - IF query.createdBy is defined:
        //       - IF query.createdBy == request user: return all createdBy query.username
        //       - IF query.createdBy != request user: return nothing
        let getCreatedBy: Nullable<string> | undefined = query.createdBy
        if (isAdmin) {
            if (!query.createdBy) {
                getCreatedBy = undefined
            }
        } else {
            if (!query.createdBy) {
                getCreatedBy = res.locals.username
            } else {
                if (query.createdBy !== res.locals.username) {
                    getCreatedBy = null
                }
            }
        }

        const options: ArrayResultOptions<SortOptions<ImageMetadata, ImageMetadataSortFields>> = {
            startFrom: (query.p - 1) * query.pp,
            maxResults: query.pp,
            sort: [{ field: query.sortBy, descending: query.desc }],
        }

        let im = await DB.getImageMetadataCreatedBy(getCreatedBy, options)

        res.status(200)
            .json(getPaginator(ImageMetadata, req, im, query.p, query.pp))
            .send()
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
        } while (await DB.getImageMetadataById(id) !== null)

        const dimensions = sizeOf(fileContent)
        const size = fileContent.byteLength

        const location = await CDN.putImage(fileContent, id, fileFormat)
        const im = await DB.createImageMetadata(new ImageMetadata({
            id: id,
            height: dimensions.height,
            width: dimensions.width,
            size: size,
            format: fileFormat,
            createdBy: createdBy,
            createdAt: new Date().toISOString(),
            src: location,
            alt: query.alt ? query.alt : null,
            origin: query.origin ? query.origin : null
        }))

        res.location(`/image/${im.id}`)
        res.status(201).json(im).send()
        next()
    }

    static deleteImage: RequestHandler = async (req, res, next) => {
        const id: string = String(req.params.id)

        const im = await DB.getImageMetadataById(id)
        const isAdmin = Scope.scopeContainsAny(res.locals.userScopes, SCOPES.admin)
        if (im === null || (im.createdBy.username !== res.locals.username && !isAdmin)) {
            throw new NotFoundError(`Image with id ${id} does not exist.`)
        }

        await CDN.deleteImage(`${im.id}.${im.format}`)
        await DB.deleteImageMetadata(id)

        res.status(204).send()
        next()
    }
}