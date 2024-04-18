import { Request, Response } from "express";

import CategoryManagerService from "../services/category-manager.service";

import response from "../utils/response";

class CategoryManagerController {
  async create(req: Request, res: Response) {
    const result = await CategoryManagerService.create(
      req.body,
      (req as any).user.id
    );
    res.status(200).send(response("new category", result));
  }

  async update(req: Request, res: Response) {
    const result = await CategoryManagerService.update(
      req.body,
      parseInt(req.params.id)
    );
    res.status(200).send(response("category updated", result));
  }

  async get(req: Request, res: Response) {
    const result = await CategoryManagerService.get(parseInt(req.params.id));
    res.status(201).send(response("category details", result));
  }

  async delete(req: Request, res: Response) {
    const result = await CategoryManagerService.delete(parseInt(req.params.id));
    res.status(201).send(response("category deleted", result));
  }
}

export default new CategoryManagerController();
