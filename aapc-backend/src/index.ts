import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import newsRouter from "./routes/news";
import researchRouter from "./routes/research";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.json({"message": "ok"});
})

app.use("/content/news", newsRouter)
app.use("/content/research", researchRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
