export interface IJwtPayload {
  username: string;
  role: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
