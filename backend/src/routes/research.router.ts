import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import ResearchController from "@/controllers/research.controller"
import Scope from "@/middleware/Auth";
import { SCOPES } from "@/util/const";

export default class ResearchRouter {
    static url = "/content/research"

    static router(): Router {
        const router = express.Router()

        // scope: anonymous
        router.get("/",
            expressAsyncHandler(ResearchController.getResearch)
        )

        // scope: anonymous
        router.get("/:id", expressAsyncHandler(ResearchController.getResearchById))

        router.get("/by-user/:username", expressAsyncHandler(ResearchController.getAllResearchByUser))

        // scope: maintainer
        router.post("/", Scope.has(SCOPES.maintainer),
            expressAsyncHandler(ResearchController.createResearch)
        )

        // scope: maintainer
        router.put("/:id", Scope.has(SCOPES.maintainer),
            expressAsyncHandler(ResearchController.editResearch)
        )

        // scope: maintainer
        router.delete("/:id", Scope.has(SCOPES.maintainer),
            expressAsyncHandler(ResearchController.deleteResearch)
        )

        return router
    }
}
