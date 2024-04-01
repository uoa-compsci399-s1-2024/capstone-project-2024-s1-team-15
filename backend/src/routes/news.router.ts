import express, { Router } from "express";
import NewsController from "../controllers/news.controller";

export default class NewsRouter {
    static url = "/content/news"

    static router (): Router {
        const router = express.Router()

        router.get("/", NewsController.getAllNews)
        router.get("/:id", NewsController.getNewsById)

        return router
    }
}
