import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import PollenDataController from "@/controllers/pollenData.controller"
import Scope from "@/middleware/Auth";
import { SCOPES } from "@/util/const";

export default class PollenDataRouter {
    static url = "/pollen-data"

    static router(): Router {
        const router = express.Router()

        // scope: anonymous
        router.get("/", expressAsyncHandler(PollenDataController.getPollenData))

        // scope: maintainer
        router.post("/", Scope.has(SCOPES.maintainer),
            express.raw({ type: "*/*" }),
            expressAsyncHandler(PollenDataController.createPollenData)
        )

        // scope: maintainer
        router.delete("/", Scope.has(SCOPES.maintainer),
            expressAsyncHandler(PollenDataController.deletePollenData)
        )

        return router
    }
}
