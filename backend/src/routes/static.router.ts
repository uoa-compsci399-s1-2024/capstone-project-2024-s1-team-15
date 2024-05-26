import express, { Router } from "express";
import StaticController from "@/controllers/static.controller";
import expressAsyncHandler from "express-async-handler";

export default class StaticRouter {
    static url = "/static"

    static router(): Router {
        const router = express.Router()

        router.get("/:name", expressAsyncHandler(StaticController.getStaticContent))

        return router
    }
}