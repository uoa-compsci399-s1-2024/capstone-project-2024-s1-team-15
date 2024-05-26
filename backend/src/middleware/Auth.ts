import { Request, RequestHandler } from "express";
import { UserScope } from "@aapc/types";
import { ForbiddenError, UnauthorizedError } from "@/errors/HTTPErrors";
import { AUTH } from "@/services/services";
import { JWTPayload } from "@/services/auth/auth.service";
import { SCOPES } from "@/util/const";


export default class Scope {
    private static unauthorized =
        new UnauthorizedError("Bearer token invalid or missing in Authorization header.")

    private static forbidden =
        new ForbiddenError("Missing required permissions to access to this resource.")

    private static getPayload(req: Request): JWTPayload {
        const authHeaders = req.headers.authorization
        if (!authHeaders) throw Scope.unauthorized

        const jwtToken = authHeaders.trim().split(" ")[1]
        if (!jwtToken) throw Scope.unauthorized

        const jwtPayload = AUTH.verifyToken(jwtToken)
        if (!jwtPayload) throw Scope.unauthorized

        return jwtPayload
    }

    static scopeContainsAny(userScopes: UserScope[], hasAny: UserScope[]): boolean {
        for (let userScope of userScopes) {
            if (hasAny.indexOf(userScope) !== -1) return true
        }
        return false
    }

    static has(scopes: UserScope[]): RequestHandler {
        return (req, res, next) => {
            const jwtPayload = Scope.getPayload(req)
            if (!Scope.scopeContainsAny(jwtPayload.scopes, scopes)) {
                throw Scope.forbidden
            } else {
                res.locals.username = jwtPayload.username
                res.locals.userScopes = jwtPayload.scopes
                next()
            }
        }
    }

    static currentUser: RequestHandler = (req, res, next) => {
        const jwtPayload = Scope.getPayload(req)
        if (jwtPayload.username !== req.params.username && !Scope.scopeContainsAny(jwtPayload.scopes, SCOPES.admin)) {
            throw Scope.forbidden
        } else {
            next()
        }
    }
}
