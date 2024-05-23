import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import AuthController from "@/controllers/auth.controller"
import Scope from "@/middleware/Auth";

export default class AuthRouter {
    static url = "/auth"

    static router(): Router {
        const router = express.Router()

        // scope: anonymous
        router.post("/login",
            expressAsyncHandler(AuthController.login)
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
        router.post("/password/forgot/:username", expressAsyncHandler(AuthController.resetPassword))

        // scope: currentUser
        router.post("/password/:username", Scope.currentUser,
            expressAsyncHandler(AuthController.resetPassword)
        )

        return router
    }
}
