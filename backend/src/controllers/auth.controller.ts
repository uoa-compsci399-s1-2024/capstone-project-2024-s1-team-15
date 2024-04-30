import { RequestHandler } from "express"
import { UnauthorizedError } from "@/errors/HTTPErrors"
import { AUTH, DB } from "@/services/services"
import { ChangePasswordIn, DeactivateIn, LoginIn, RegisterIn } from "@/util/validation/input.types"
import { validate } from "@/util/functions"

export default class AuthController {
    static register: RequestHandler = async (req, res, next) => {
        const body = validate(RegisterIn, req.body)
        res.status(200).send(body)
        next()
    }

    static login: RequestHandler = async (req, res, next) => {
        const incorrectLoginError = new UnauthorizedError("Username and/or password incorrect.")
        const body = validate(LoginIn, req.body)

        const user = await DB.getUserByUsername(body.username)
        if (user === null) throw incorrectLoginError

        const authToken = await AUTH.login(user, body.password)
        if (authToken === null) throw incorrectLoginError

        res.status(200).json({
            token: authToken,
            user: user,
        }).send()
        next()
    }

    static deactivate: RequestHandler = async (req, res, next) => {
        const body = validate(DeactivateIn, req.body)
        res.status(200).send(body)
        next()
    }

    static changePassword: RequestHandler = async (req, res, next) => {
        const body = validate(ChangePasswordIn, req.body)
        res.status(200).send(body)
        next()
    }

    static resetPassword: RequestHandler = async (req, res, next) => {
        res.send()
        next()
    }
}
