import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import NewsController from "@/controllers/news.controller"

export default class NewsRouter {
    static url = "/content/news"

    static router(): Router {
        const router = express.Router()

        router.get("/", expressAsyncHandler(NewsController.getNews))
        router.post("/", expressAsyncHandler(NewsController.createNews))

        router.get("/:id", expressAsyncHandler(NewsController.getNewsById))
        router.put("/:id", expressAsyncHandler(NewsController.editNews))
        router.delete("/:id", expressAsyncHandler(NewsController.deleteNews))

        return router
    }
}
