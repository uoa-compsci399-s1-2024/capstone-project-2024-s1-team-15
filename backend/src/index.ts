import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import NewsRouter from "./routes/news.router";
import ResearchRouter from "./routes/research.router";

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(require("cors")())

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "ok",
        environment: (process.env.ENV?? "local").toLowerCase()
    })
})

app.use(NewsRouter.url, NewsRouter.router())
app.use(ResearchRouter.url, ResearchRouter.router())


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
