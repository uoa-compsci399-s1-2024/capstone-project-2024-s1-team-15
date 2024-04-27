import { NextFunction, Request, Response } from "express"
import { HTTPError } from "@/errors/HTTPErrors"

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(err instanceof HTTPError ? err.status : 500)

    res.json({
        errors: [{ message: err.message }],
    })

    res.send()

    next()
}
