import { Request, Response } from "express";

import AuthService from "../services/auth.service";

import response from "../utils/response";

class AuthController {
  async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);
    res.status(200).send(response("login", result));
  }

  async me(req: Request, res: Response) {
    const user = (req as any).user;
    const result = await AuthService.getUser(user.id);
    res.status(200).send(response("Me", result));
  }

  async register(req: Request, res: Response) {
    const result = await AuthService.register(req.body);
    res.status(201).send(response("account created succesfully", result));
  }
}

export default new AuthController();
