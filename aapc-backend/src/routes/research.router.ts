import express, { Router } from "express";
import { getAllResearch, getResearchById } from "../controllers/research.controller";

export const researchRouter: Router = express.Router()
export const researchURL = "research"

researchRouter.get("/", getAllResearch)
researchRouter.get("/:id", getResearchById)
