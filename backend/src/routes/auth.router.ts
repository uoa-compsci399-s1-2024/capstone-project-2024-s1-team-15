import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import AuthController from "@/controllers/auth.controller"
import Scope from "@/middleware/Auth";
import { SCOPES } from "@/util/const";

export default class AuthRouter {
    static url = "/auth"

    static router(): Router {
        const router = express.Router()

        // scope: anonymous
        router.post("/login",
            expressAsyncHandler(AuthController.login)
        )

        // scope: user
        router.post("/refresh-token", Scope.has(SCOPES.user),
            expressAsyncHandler(AuthController.refreshToken)
        )

        // scope: anonymous
        router.post("/register",
            expressAsyncHandler(AuthController.register)
        )

        // scope: currentUser
        router.post("/deactivate/:username", Scope.currentUser,
            expressAsyncHandler(AuthController.deactivate)
        )

        // scope: currentUser
        router.put("/password/:username", Scope.currentUser,
            expressAsyncHandler(AuthController.changePassword)
        )

        // scope: anonymous
        router.post("/forgot-password", expressAsyncHandler(AuthController.sendResetPasswordEmail))

        // scope: anonymous
        router.post("/password", expressAsyncHandler(AuthController.resetPassword))

        return router
    }
}
