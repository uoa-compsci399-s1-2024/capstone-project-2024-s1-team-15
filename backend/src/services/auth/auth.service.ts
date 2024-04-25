import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Nullable } from "../../util/types/util.types";

export default class AuthContext {
  private readonly authServiceProvider: IAuthService;

  constructor(authServiceProvider: IAuthService) {
    this.authServiceProvider = authServiceProvider;
  }

  private issueToken(username: string): string {
    const secret = process.env.JWT_SECRET ?? "local";
    return sign(
      {
        username: username,
        roles: ["user"],
      },
      secret,
    );
  }

  async login(username: string, password: string): Promise<Nullable<string>> {
    if (await this.authServiceProvider.authenticateUser(username, password)) {
      return this.issueToken(username);
    } else {
      return null;
    }
  }

  verifyToken(token: string): Nullable<string | JwtPayload> {
    const secret = process.env.JWT_SECRET ?? "local";
    try {
      return verify(token, secret);
    } catch (err) {
      return null;
    }
  }
}

export interface IAuthService {
  authenticateUser(username: string, password: string): Promise<boolean>;
  createUser(username: string, password: string): Promise<null>;
  changePassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<null>;
  resetPassword(username: string, newPassword: string): Promise<null>;
}
