import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import NewsRouter from "@/routes/news.router"
import ResearchRouter from "@/routes/research.router"
import AuthRouter from "@/routes/auth.router"
import { errorHandler } from "@/middleware/ErrorHandler"
import UserRouter from "@/routes/user.router"
import PollenDataRouter from "./routes/pollenData.router"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// Use JSON parser middleware
app.use(express.json())

// Use CORS middleware
app.use(require("cors")())

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "ok",
        environment: (process.env.ENV ?? "local").toLowerCase(),
    })
})

app.use(NewsRouter.url, NewsRouter.router())
app.use(ResearchRouter.url, ResearchRouter.router())
app.use(UserRouter.url, UserRouter.router())
app.use(PollenDataRouter.url, PollenDataRouter.router())
app.use(AuthRouter.url, AuthRouter.router())

// Use Error Handler middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
