import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";

export default class AuthRouter {
  static url = "/auth";

  static router(): Router {
    const router = express.Router();

    router.post("/login", AuthController.login);

    router.post("/register", AuthController.register);

    router.put("/password", AuthController.changePassword);
    router.post("/password", AuthController.resetPassword);

    return router;
  }
}
