import { RequestHandler } from "express"
import { AUTH, DB } from "@/services/services"
import { UnauthorizedError } from "@/errors/HTTPErrors"
import { UserScope } from "@aapc/types"
import { JWTPayload } from "@/services/auth/auth.service"

function authenticateFromAuthHeader(bearerHeader?: string): JWTPayload {
    if (!bearerHeader) throw new UnauthorizedError("Could not find your login token in the request header.")

    let token
    try {
        token = bearerHeader.split(" ")[1]
    } catch (e) {
        throw new UnauthorizedError("Could not parse your login token from the request header.")
    }

    const user = AUTH.verifyToken(token)

    if (user === null)
        throw new UnauthorizedError("User is not logged in correctly. Try logging out and logging in again.")

    return user
}

export default class PollenDataController {
    static getPollenData: RequestHandler = async (req, res, next) => {
        const pollenData = DB.getPollenDataset && (await DB.getPollenDataset())
        res.json(pollenData)
        next()
    }

    static createPollenData: RequestHandler = async (req, res, next) => {
        const user = authenticateFromAuthHeader(req.headers.authorization)

        // authorize
        if (!user.scopes.includes(UserScope.maintainer))
            throw new UnauthorizedError("You don't have permissions to update pollen data")

        // create in db
        const pollenData = req.body
        await DB.createPollenDataset(pollenData)

        res.sendStatus(201)
        next()
    }

    static deletePollenData: RequestHandler = async (req, res, next) => {
        const user = authenticateFromAuthHeader(req.headers.authorization)

        // authorize
        if (!user.scopes.includes(UserScope.maintainer))
            throw new UnauthorizedError("You don't have permissions to update pollen data")

        // delete from db
        await DB.deletePollenDataset()

        res.sendStatus(200)
        next()
    }
}
