import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import ContactAAPCController from "@/controllers/contactAAPC.controller"

export default class ContactAAPCRouter {
    static url = "/contact-aapc"

    static router(): Router {
        const router = express.Router()

        router.post("/", expressAsyncHandler(ContactAAPCController.sendNotificationToAAPC))

        return router
    }
}
