import { RequestHandler } from "express"
import { BadRequestError, UnauthorizedError } from "@/errors/HTTPErrors"
import { AUTH } from "@/services/services"
import { User } from "@aapc/types"

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

        const authToken = await AUTH.login(username, password)
        if (authToken === null) {
            throw new UnauthorizedError("username and/or password incorrect.")
        }

        // update this to show additional user details
        const authenticatedUser = new User({
            username: username,
            email: username,
            displayName: "Admin",
            verified: true,
            registeredAt: undefined,
        })

        res.status(200).json({ token: authToken, user: authenticatedUser })
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
