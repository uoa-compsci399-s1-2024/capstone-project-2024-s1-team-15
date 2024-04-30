import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import UserController from "@/controllers/user.controller"

export default class UserRouter {
    static url = "/user"

    static router(): Router {
        const router = express.Router()

        router.get("/", expressAsyncHandler(UserController.getUser))
        router.post("/", expressAsyncHandler(UserController.createUser))

        router.get("/:username", expressAsyncHandler(UserController.getUserByUsername))
        router.put("/:username", expressAsyncHandler(UserController.editUser))
        router.put("/:username/scope", expressAsyncHandler(UserController.editUserScopes))
        router.delete("/:username", expressAsyncHandler(UserController.deleteUser))

        return router
    }
}
