import { RequestHandler } from "express"
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/errors/HTTPErrors"
import { AUTH, DB } from "@/services/services"
import {
    ChangePasswordIn,
    ConfirmRegisterIn,
    DeactivateIn,
    InitiateResetPasswordIn,
    LoginIn,
    RegisterIn,
    ResetPasswordIn,
} from "@/util/validation/input.types"
import { validate } from "@/util/functions"
import { User, UserScope } from "@aapc/types"

export default class AuthController {
    static register: RequestHandler = async (req, res, next) => {
        const body = validate(RegisterIn, req.body)

        if (await DB.getUserByUsername(body.username)) {
            return new BadRequestError("This username is already in use by another user.")
        }
        if (await DB.getUserByEmail(body.email)) {
            return new BadRequestError("This email is already in use by another user.")
        }

        await AUTH.signup(body.username, body.password, body.email)
        await DB.createUser(new User({
            username: body.username,
            email: body.email,
            verified: false,
            displayName: body.displayName,
            registeredAt: new Date().toISOString(),
            scopes: [UserScope.user, UserScope.regular],
            iconSrc: null
        }))

        res.sendStatus(201)
        next()
    }

    static confirmRegister: RequestHandler = async (req, res, next) => {
        const body = validate(ConfirmRegisterIn, req.body)
        const u = await DB.getUserByUsername(body.username)
        if (!u) throw new NotFoundError(`User with username '${body.username}' not found.`)

        if (!await AUTH.confirmSignup(body.username, body.confirmationCode)) {
            throw new UnauthorizedError("Confirmation code provided is not correct.")
        }

        u.verified = true
        await DB.editUser(u.username, u)
        res.sendStatus(204)
        next()
    }

    static login: RequestHandler = async (req, res, next) => {
        const body = validate(LoginIn, req.body)

        const user = await DB.getUserByUsername(body.username)
        if (user === null) throw new UnauthorizedError("Username and/or password incorrect.")

        const authToken = await AUTH.login(user, body.password)
        if (authToken === null) throw new UnauthorizedError("Username and/or password incorrect.")

        res.status(200).json({
            token: authToken,
            user: user,
        })
        next()
    }

    static refreshToken: RequestHandler = async (_, res, next) => {
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
        res.sendStatus(204)
        next()
    }

    static changePassword: RequestHandler = async (req, res, next) => {
        const body = validate(ChangePasswordIn, req.body)
        if (body.newPassword === body.currentPassword) {
            throw new BadRequestError("New password cannot be the same as current password.")
        }
        const username = res.locals.username
        if (!await AUTH.authServiceProvider.changePassword(username, body.currentPassword, body.newPassword)) {
            throw new UnauthorizedError("The current password provided is incorrect.")
        }
        res.sendStatus(204)
        next()
    }

    static initiateResetPassword: RequestHandler = async (req, res, next) => {
        const body = validate(InitiateResetPasswordIn, req.body)
        const u = await DB.getUserByEmail(body.email)
        if (!u) throw new UnauthorizedError("No user exists with this email.")
        if (!u.verified) throw new UnauthorizedError("User is not verified.")

        await AUTH.authServiceProvider.initiateResetPassword(u.username)

        res.sendStatus(204)
        next()
    }

    static resetPassword: RequestHandler = async (req, res, next) => {
        const body = validate(ResetPasswordIn, req.body)
        const u = await DB.getUserByEmail(body.email)
        if (!u) throw new UnauthorizedError("No user exists with this email.")

        if (!await AUTH.authServiceProvider.resetPassword(u.email, body.verificationCode, body.newPassword)) {
            throw new UnauthorizedError("Code")
        }


        res.sendStatus(200)
        next()
    }
}
