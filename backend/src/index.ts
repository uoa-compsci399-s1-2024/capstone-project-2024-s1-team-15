import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import NewsRouter from "@/routes/news.router"
import ResearchRouter from "@/routes/research.router"
import AuthRouter from "@/routes/auth.router"
import UserRouter from "@/routes/user.router"
import PollenDataRouter from "@/routes/pollenData.router"
import ContactRouter from "@/routes/contact.router"
import ImageRouter from "@/routes/image.router"
import StaticRouter from "@/routes/static.router"
import errorHandler from "@/middleware/ErrorHandler"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// Use JSON parser middleware
app.use(express.json({ limit: "50mb" }))

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
app.use(ContactRouter.url, ContactRouter.router())
app.use(AuthRouter.url, AuthRouter.router())
app.use(ImageRouter.url, ImageRouter.router())
app.use(StaticRouter.url, StaticRouter.router())

// Use Error Handler middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
