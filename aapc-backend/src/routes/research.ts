import express, { Router } from "express";

const researchRouter: Router = express.Router()

researchRouter.get("/")
researchRouter.get("/:id")

export default researchRouter
