import { Router } from "express";
import Auth from "../middlewares/auth.middleware";

import expensesController from "../controllers/expenses.controller";

const router = Router();

router.post("/create", Auth(), expensesController.create);

// router.post("/update", Auth(), categoryManagerController.update);

router.get("/get/:id", Auth(), expensesController.get);
router.get("/get-by-user/:id/", Auth(), expensesController.getByUser);

router.delete("/delete/:id", Auth(), expensesController.delete);

export default router;
