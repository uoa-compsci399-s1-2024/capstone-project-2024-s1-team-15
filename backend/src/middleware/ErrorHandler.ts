import { NextFunction, Request, Response } from "express"
import { BadRequestError, HTTPError } from "@/errors/HTTPErrors"

export function errorHandler(err: Error, _: Request, res: Response, next: NextFunction) {
    res.status(err instanceof HTTPError ? err.status : 500)
    if (err instanceof BadRequestError) {
        res.json({
            message: err.message,
            errors: err.errors,
        })
    } else {
        res.json({
            message: "Internal Server Error: " + err.message,
        })
    }
    res.send()
    next()
}
