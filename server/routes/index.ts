import { Router } from "express";

import Auth from "./auth.route";
import CatęgoryManager from "./category-manager.route";
import Expenses from "./expenses.route";

import response from "../utils/response";

const router = Router();

/**
 * Routes
 */
router.get("/", (_, res) => res.status(200).send(response("ping", "lift off")));

router.use("/api/auth", Auth);
router.use("/api/categories", CatęgoryManager);
router.use("/api/expenses", Expenses);

export default router;
