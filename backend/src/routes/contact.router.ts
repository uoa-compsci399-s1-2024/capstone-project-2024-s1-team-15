import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import ContactController from "@/controllers/contact.controller"

export default class ContactRouter {
    static url = "/contact"

    static router(): Router {
        const router = express.Router()

        router.post("/", expressAsyncHandler(ContactController.sendContactEmail))

        return router
    }
}
