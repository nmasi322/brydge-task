import { Request, Response } from "express";

import ExpensesService from "../services/expenses.service";
import response from "../utils/response";

class ExpensesController {
  async create(req: Request, res: Response) {
    const result = await ExpensesService.create(req.body, (req as any).user.id);
    res.status(200).send(response("new expense log", result));
  }

  async get(req: Request, res: Response) {
    const result = await ExpensesService.get(parseInt(req.params.id));
    res.status(201).send(response("expense details", result));
  }

  async delete(req: Request, res: Response) {
    const result = await ExpensesService.delete(parseInt(req.params.id));
    res.status(201).send(response("expense deleted", result));
  }
}

export default new ExpensesController();
