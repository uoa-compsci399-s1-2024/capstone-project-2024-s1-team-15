import express, { Router } from "express";
import ResearchController from "../controllers/research.controller";
import expressAsyncHandler from "express-async-handler";

export default class ResearchRouter {
  static url = "/content/research";

  static router(): Router {
    const router = express.Router();

    router.get("/", expressAsyncHandler(ResearchController.getResearch));
    router.post("/", expressAsyncHandler(ResearchController.createResearch));

    router.get("/:id", expressAsyncHandler(ResearchController.getResearchById));
    router.put("/:id", expressAsyncHandler(ResearchController.editResearch));
    router.delete(
      "/:id",
      expressAsyncHandler(ResearchController.deleteResearch),
    );

    return router;
  }
}
