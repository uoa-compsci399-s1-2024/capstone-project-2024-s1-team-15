import express, { Router } from "express";
import ResearchController from "../controllers/research.controller";
import expressAsyncHandler from "express-async-handler";

export default class ResearchRouter {
    static url = "/content/research"

    static router(): Router {
        const router = express.Router()

        router.get("/", expressAsyncHandler(ResearchController.getAllResearch))
        router.get("/:id", expressAsyncHandler(ResearchController.getResearchById))

        return router
    }
}
