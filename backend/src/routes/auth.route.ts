import { Router } from "express";
import Auth from "../middlewares/auth.middleware";

import authController from "../controllers/auth.controller";

const router = Router();

router.post("/login", authController.login);

router.get("/me", Auth(), authController.me);

router.post("/signup", authController.register);

export default router;
