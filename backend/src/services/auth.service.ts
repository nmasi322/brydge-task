import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import CustomError from "../utils/custom-error";

import { JWT, BCRYPT_SALT } from "../config";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
class AuthService {
  async register(data: SignupInput) {
    if (!data.name) throw new CustomError("name is required", 400);
    if (!data.email) throw new CustomError("email is required", 400);

    let user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user) throw new CustomError("email already exists", 400);

    user = await prisma.user.create({ data });

    // Generate Auth tokens
    const authTokens = await this.generateAuthTokens({
      userId: user.id,
    });

    return { user, token: authTokens };
  }

  async getUser(id: number) {
    let user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new CustomError("user does not exist", 404);

    return { user };
  }

  async login(data: LoginInput) {
    if (!data.email) throw new CustomError("email is required", 400);
    if (!data.password) throw new CustomError("password is required", 400);

    // Check if user exist
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new CustomError("incorrect email or password", 400);

    const isCorrect = await bcrypt.compare(data.password, user.password);
    if (!isCorrect) throw new CustomError("incorrect email or password", 400);

    const authTokens = await this.generateAuthTokens({
      userId: user.id,
    });

    // const userJSON = user.toJSON()
    // delete userJSON.pin
    // delete userJSON.password

    return { user, token: authTokens };
  }

  async generateAuthTokens(data: GenerateTokenInput) {
    const { userId } = data;

    const accessToken = jsonwebtoken.sign({ id: userId }, JWT.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = crypto.randomBytes(32).toString("hex");

    const refreshTokenjsonwebtoken = jsonwebtoken.sign(
      { userId, refreshToken },
      JWT.REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken: refreshTokenjsonwebtoken };
  }
}

export default new AuthService();
