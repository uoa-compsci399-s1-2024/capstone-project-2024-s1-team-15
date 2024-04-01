import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { newsRouter, newsURL } from "./routes/news.router";
import { researchRouter, researchURL } from "./routes/research.router";

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "ok" })
})

app.use(`/content/${newsURL}`, newsRouter)
app.use(`/content/${researchURL}`, researchRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
