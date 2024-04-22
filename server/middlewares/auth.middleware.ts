import jsonwebtoken from "jsonwebtoken";
import { JWT } from "../config";
import CustomError from "../utils/custom-error";

import * as express from "express";
// import { CustomRequest } from "../types/extended";

import { PrismaClient } from "@prisma/client";

interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}

const prisma = new PrismaClient();

const auth = () => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";

    if (!token)
      throw new CustomError("unauthorized access: Token not found", 401);

    // Implementation allows for authorization to be read from req header and httpOnly cookie
    let decoded = null;

    try {
      // attempts to verify header token
      decoded = jsonwebtoken.verify(token, JWT.JWT_SECRET) as JWTPayload;
    } catch (err) {
      throw new CustomError("unauthorized access: Token expired", 400);
    }

    if (decoded !== null) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: parseInt(decoded.id) },
        });

        if (!user)
          throw new CustomError(
            "unauthorized access: User does not exist",
            401
          );

        (req as any).user = user;
      } finally {
        await prisma.$disconnect();
      }

      next();
    }
  };
};

export default auth;
