import express, { Router } from "express";
import { getAllNews, getNewsById } from "../controllers/news.controller";

export const newsRouter: Router = express.Router()
export const newsURL = "news"

newsRouter.get("/", getAllNews)
newsRouter.get("/:id", getNewsById)
