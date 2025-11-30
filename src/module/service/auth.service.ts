import { sign } from "hono/jwt";
import UserService from "./user.service";
import { HTTPException } from "hono/http-exception";
import type { JwtPayload } from "../../type/jwt_payload.type";
import type { EnvConfig } from "../../config/env";
import envConfig from "../../config/env";
import type { Db } from "mongodb";
import type { LoginAuthInput } from "../schema/auth.schema";
import { generateToken } from "../../helper/token";

export default class AuthService {
  private userService: UserService;
  env: EnvConfig;
  constructor(db: Db) {
    this.userService = new UserService(db);
    this.env = envConfig();
  }

  public async login({ username, password }: LoginAuthInput) {
    const user = await this.userService.findByUsername(username);

    const isValid =
      user && (await Bun.password.verify(password, user.password));

    if (!user || !isValid) {
      throw new HTTPException(400, {
        message: "Username or password is incorrect",
      });
    }

    const token = generateToken();

    return token;
  }
}
