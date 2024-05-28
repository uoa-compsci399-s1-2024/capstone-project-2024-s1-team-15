import { RequestHandler } from "express"
import { BadRequestError, UnauthorizedError } from "@/errors/HTTPErrors"
import { AUTH, DB } from "@/services/services"
import {
    ChangePasswordIn,
    DeactivateIn,
    ForgotPasswordIn,
    LoginIn,
    RegisterIn,
    ResetPasswordIn,
} from "@/util/validation/input.types"
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

    static refreshToken: RequestHandler = async (req, res, next) => {
        const user = await DB.getUserByUsername(res.locals.username)
        if (!user) throw new UnauthorizedError("No user exists with this username.")
        const token = AUTH.issueTokenFromUser(user)

        res.status(200).json({
            token: token,
            user: user
        })
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

    static sendResetPasswordEmail: RequestHandler = async (req, res, next) => {
        const body = validate(ForgotPasswordIn, req.body)

        const user = (await DB.getAllUsers()).results.find((user) => user.email === body.email)

        if (user === undefined) throw new UnauthorizedError("No user exists with this email.")

        try {
            await AUTH.authServiceProvider.sendResetPasswordEmail(user.email)
        } catch (error: any) {
            throw new BadRequestError(`Reset password email couldn't be sent: ${error.message}`)
        }

        res.sendStatus(200)
        next()
    }

    static resetPassword: RequestHandler = async (req, res, next) => {
        const body = validate(ResetPasswordIn, req.body)

        const user = (await DB.getAllUsers()).results.find((user) => user.email === body.email)

        if (user === undefined) throw new UnauthorizedError("No user exists with this email.")

        try {
            await AUTH.authServiceProvider.resetPassword(user.email, body.verificationCode, body.newPassword)
        } catch (error: any) {
            throw new BadRequestError(`Password could not be reset: ${error.message}`)
        }

        res.sendStatus(200)
        next()
    }
}
