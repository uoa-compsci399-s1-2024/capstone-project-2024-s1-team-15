import express, { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import UserController from "@/controllers/user.controller"
import Scope from "@/middleware/Auth";
import { SCOPES } from "@/util/const";

export default class UserRouter {
    static url = "/user"

    static router(): Router {
        const router = express.Router()

        // scope: anonymous
        router.get("/:username", expressAsyncHandler(UserController.getUserByUsername))

        // scope: currentUser
        router.put("/:username", Scope.currentUser,
            expressAsyncHandler(UserController.editUser)
        )

        // scope: admin
        router.get("/", Scope.has(SCOPES.admin),
            expressAsyncHandler(UserController.getUser)
        )

        // scope: admin
        router.post("/", Scope.has(SCOPES.admin),
            expressAsyncHandler(UserController.createUser)
        )

        // scope: admin
        router.put("/:username/scope", Scope.has(SCOPES.admin),
            expressAsyncHandler(UserController.editUserScope)
        )

        // scope: admin
        router.delete("/:username", Scope.has(SCOPES.admin),
            expressAsyncHandler(UserController.deleteUser)
        )

        return router
    }
}
