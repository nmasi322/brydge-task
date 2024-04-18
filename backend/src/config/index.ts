export const JWT = {
  ACCESS_TOKEN_LIFETIME: "1hr",
  REFRESH_TOKEN_LIFETIME: "30d",
  JWT_SECRET: process.env.JWT_SECRET || "aadd-233344-22vdfa",
  REFRESH_SECRET: process.env.JWT_SECRET || "aadd-233344-22vdfa",
};

export const BCRYPT_SALT = 10;

export const PORT = 8000;
