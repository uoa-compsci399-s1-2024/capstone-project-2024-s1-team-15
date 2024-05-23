import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import NewsController from "@/controllers/news.controller"
import Scope from "@/middleware/Auth";
import { SCOPES } from "@/util/const";

export default class NewsRouter {
    static url = "/content/news"

    static router(): Router {
        const router = express.Router()

        // scope: anonymous
        router.get("/",
            expressAsyncHandler(NewsController.getNews)
        )

        // scope: anonymous
        router.get("/:id", expressAsyncHandler(NewsController.getNewsById))

        router.get("/by-user/:username", expressAsyncHandler(NewsController.getAllNewsByUser))

        // scope: maintainer
        router.post("/", Scope.has(SCOPES.maintainer),
            expressAsyncHandler(NewsController.createNews)
        )

        // scope: maintainer
        router.put("/:id", Scope.has(SCOPES.maintainer),
            expressAsyncHandler(NewsController.editNews)
        )

        // scope: maintainer
        router.delete("/:id", Scope.has(SCOPES.maintainer),
            expressAsyncHandler(NewsController.deleteNews)
        )

        return router
    }
}
