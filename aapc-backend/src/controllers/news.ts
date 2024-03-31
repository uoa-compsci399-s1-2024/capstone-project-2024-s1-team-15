import { NextFunction, Request, Response } from "express";
import { Article } from "aapc-types";

async function getAllNews (req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.params.id)
        res.json({ "hello": "hello" })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export { getAllNews }
