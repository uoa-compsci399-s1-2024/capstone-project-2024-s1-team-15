import express, { Router } from "express"
import AuthController from "../controllers/auth.controller"
import expressAsyncHandler from "express-async-handler";

export default class AuthRouter {
    static url = "/auth"

    static router(): Router {
        const router = express.Router()

        router.post("/login", expressAsyncHandler(AuthController.login))

        router.post("/register", expressAsyncHandler(AuthController.register))

        router.put("/password", expressAsyncHandler(AuthController.changePassword))
        router.post("/password", expressAsyncHandler(AuthController.resetPassword))

        return router
    }
}
