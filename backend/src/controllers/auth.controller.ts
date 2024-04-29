import { RequestHandler } from "express"
import { UnauthorizedError } from "@/errors/HTTPErrors"
import { AUTH } from "@/services/services"
import { User } from "@aapc/types"
import { ChangePasswordIn, DeactivateIn, LoginIn, RegisterIn } from "@/util/validation/input.types"
import { validate } from "@/util/functions"

export default class AuthController {
    static register: RequestHandler = async (req, res, next) => {
        const body = validate(RegisterIn, req.body)
        res.status(200).send(body)
        next()
    }

    static login: RequestHandler = async (req, res, next) => {
        const body = validate(LoginIn, req.body)
        const authToken = await AUTH.login(body.username, body.password)
        if (authToken === null) {
            throw new UnauthorizedError("username and/or password incorrect.")
        }
        // TODO: get user object from db
        const authenticatedUser = new User({
            username: body.username,
            email: body.username,
            displayName: "Admin",
            verified: true,
            registeredAt: undefined,
        })
        res.status(200).json({
            token: authToken,
            user: authenticatedUser,
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
        res.status(200).send(body)
        next()
    }

    static resetPassword: RequestHandler = async (req, res, next) => {
        res.send()
        next()
    }
}
