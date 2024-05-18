import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import PollenDataController from "@/controllers/pollenData.controller"

export default class PollenDataRouter {
    static url = "/pollen-data"

    static router(): Router {
        const router = express.Router()

        router.get("/", expressAsyncHandler(PollenDataController.getPollenData))
        router.post("/", express.raw({ type: "*/*" }), expressAsyncHandler(PollenDataController.createPollenData))

        return router
    }
}
