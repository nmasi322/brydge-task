interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface GenerateTokenInput {
  userId: number;
}

interface RefreshTokenInput {
  refreshToken: string;
}

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: number;
  name: string;
  password: string;
  email: string;
}
