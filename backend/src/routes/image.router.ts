import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import fileUpload from "express-fileupload"
import Scope from "@/middleware/Auth"
import { IMAGE_UPLOAD_LIMIT, SCOPES } from "@/util/const"
import ImageController from "@/controllers/image.controller";

export default class ImageRouter {
    static url = "/image"

    static router(): Router {
        const router = express.Router()

        // scope: user
        router.get("/", Scope.has(SCOPES.user),
            expressAsyncHandler(ImageController.getImageMetadataCreatedBy)
        )

        // scope: user
        router.post("/", Scope.has(SCOPES.user), fileUpload({ limits: { fileSize: IMAGE_UPLOAD_LIMIT } }),
            expressAsyncHandler(ImageController.addImage)
        )

        // scope: user
        router.get("/:id", Scope.has(SCOPES.user),
            expressAsyncHandler(ImageController.getImageMetadata)
        )

        // scope: user
        router.delete("/:id", Scope.has(SCOPES.user),
            expressAsyncHandler(ImageController.deleteImage)
        )

        return router
    }
}
