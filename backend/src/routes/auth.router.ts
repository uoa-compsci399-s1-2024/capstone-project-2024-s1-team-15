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
        router.post("/register",
            expressAsyncHandler(AuthController.register)
        )

        // scope: anonymous
        router.post("/register/confirm",
            expressAsyncHandler(AuthController.confirmRegister)
        )

        // scope: anonymous
        router.post("/login",
            expressAsyncHandler(AuthController.login)
        )

        // scope: anonymous
        router.post("/forgot-password",
            expressAsyncHandler(AuthController.initiateResetPassword)
        )

        // scope: anonymous
        router.post("/password",
            expressAsyncHandler(AuthController.resetPassword)
        )

        // scope: user
        router.post("/refresh-token", Scope.has(SCOPES.user),
            expressAsyncHandler(AuthController.refreshToken)
        )

        // scope: currentUser
        router.put("/password", Scope.has(SCOPES.user),
            expressAsyncHandler(AuthController.changePassword)
        )

        // scope: currentUser
        router.post("/deactivate", Scope.has(SCOPES.user),
            expressAsyncHandler(AuthController.deactivate)
        )

        return router
    }
}
