import { RequestHandler } from "express"
import { BadRequestError, UnauthorizedError } from "@/errors/HTTPErrors"
import { AUTH } from "@/services/services"

export default class AuthController {
    static register: RequestHandler = async (req, res, next) => {
        res.send()
        next()
    }

    static login: RequestHandler = async (req, res, next) => {
        const username = req.body.username ?? null
        const password = req.body.password ?? null

        if (username === null || password === null) {
            throw new BadRequestError("username and/or password is missing from request body.")
        }

        const authResult = await AUTH.login(username, password)
        if (authResult === null) {
            throw new UnauthorizedError("username and/or password incorrect.")
        }

        res.status(200).json(authResult)
        next()
    }

    static deactivate: RequestHandler = async (req, res, next) => {
        res.send()
        next()
    }

    static changePassword: RequestHandler = async (req, res, next) => {
        res.send()
        next()
    }

    static resetPassword: RequestHandler = async (req, res, next) => {
        res.send()
        next()
    }
}
