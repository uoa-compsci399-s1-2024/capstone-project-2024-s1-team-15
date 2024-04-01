import express, { Router } from "express";
import ResearchController from "../controllers/research.controller";

export default class ResearchRouter {
    static url = "/content/research"

    static router(): Router {
        const router = express.Router()

        router.get("/", ResearchController.getAllResearch)
        router.get("/:id", ResearchController.getResearchById)

        return router
    }
}
