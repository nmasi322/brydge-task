import { Router } from "express";
import Auth from "../middlewares/auth.middleware";

import categoryManagerController from "../controllers/category-manager.controller";

const router = Router();

router.post("/create", Auth(), categoryManagerController.create);

router.put("/update/:id", Auth(), categoryManagerController.update);

router.get("/get/:id", Auth(), categoryManagerController.get);

router.delete("/delete/:id", Auth(), categoryManagerController.delete);

export default router;
