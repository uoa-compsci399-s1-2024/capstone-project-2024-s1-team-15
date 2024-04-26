import { Request, Response, NextFunction } from "express"
import { HTTPError } from "../errors/HTTPErrors"

export function errorHandler(err: Error, req: Request, res: Response, _: NextFunction) {
    res.status(err instanceof HTTPError ? err.status : 500)

    res.json({
        errors: [{ message: err.message }],
    })

    res.send()
}
