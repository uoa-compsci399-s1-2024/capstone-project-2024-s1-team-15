import { RequestHandler } from "express"
import AuthContext from "../services/auth/auth.service"
import AWSCognitoAuthService from "../services/auth/AWSCognito.service"
import { BadRequestError, UnauthorizedError } from "../errors/HTTPErrors"

export default class AuthController {
    private static readonly authContext = new AuthContext(new AWSCognitoAuthService())

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

        const token = await this.authContext.login(username, password)
        if (token === null) {
            throw new UnauthorizedError("username and/or password incorrect.")
        }

        res.status(200).json({
            token: token,
            username: username,
        })
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
