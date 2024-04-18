import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import CustomError from "../utils/custom-error";

import { JWT, BCRYPT_SALT } from "../config";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class AuthService {
  // register user
  async register(data: SignupInput) {
    if (!data.name) throw new CustomError("name is required", 400);
    if (!data.email) throw new CustomError("email is required", 400);

    try {
      let user = await prisma.user.findUnique({ where: { email: data.email } });
      if (user) throw new CustomError("email already exists", 400);

      const hash = await bcrypt.hash(data.password, BCRYPT_SALT);

      user = await prisma.user.create({ data: { ...data, password: hash } });

      // Generate Auth tokens
      const authTokens = await this.generateAuthTokens({
        userId: user.id,
      });

      return { user, token: authTokens };
    } finally {
      await prisma.$disconnect();
    }
  }

  // retrieve user info
  async getUser(id: number) {
    try {
      let user = await prisma.user.findUnique({ where: { id } });
      if (!user) throw new CustomError("user does not exist", 404);

      return { user };
    } finally {
      await prisma.$disconnect();
    }
  }

  // log user in
  async login(data: LoginInput) {
    if (!data.email) throw new CustomError("email is required", 400);
    if (!data.password) throw new CustomError("password is required", 400);

    try {
      // Check if user exist
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (!user) throw new CustomError("user  ot found", 404);

      const isCorrect = await bcrypt.compare(data.password, user.password);
      if (!isCorrect) throw new CustomError("incorrect email or password", 400);

      const authTokens = await this.generateAuthTokens({
        userId: user.id,
      });

      return { user, token: authTokens };
    } finally {
      await prisma.$disconnect();
    }
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
