import { RequestHandler } from "express"
import { BadRequestError, UnauthorizedError } from "@/errors/HTTPErrors"
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

        res.status(200)
            .json({
                token: authToken,
                user: user,
            })
            .send()
        next()
    }

    static deactivate: RequestHandler = async (req, res, next) => {
        const body = validate(DeactivateIn, req.body)
        res.status(200).send(body)
        next()
    }

    static changePassword: RequestHandler = async (req, res, next) => {
        const body = validate(ChangePasswordIn, req.body)
        const username = req.params.username

        try {
            await AUTH.authServiceProvider.changePassword(username, body.currentPassword, body.newPassword)
        } catch (error: any) {
            throw new BadRequestError(`Password couldn't be changed: ${error.message}`)
        }

        res.sendStatus(200)
        next()
    }

    static resetPassword: RequestHandler = async (req, res, next) => {
        res.send({ partiallyCensoredUserEmail: "a******6@gmail.com" })
        next()
    }
}
