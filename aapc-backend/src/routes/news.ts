import express, { Router } from "express";
import { getAllNews } from "../controllers/news";

export const newsRouter: Router = express.Router()

newsRouter.get("/", getAllNews)
newsRouter.get("/:id", getAllNews)

export default newsRouter
