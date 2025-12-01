import { HTTPException } from "hono/http-exception";
import type { LoginAuthInput } from "../schema/auth.schema";
import { generateToken } from "../../helper/token";
import UserService from "./user.service";

export default class AuthService {
  private static _instance: AuthService;

  private userSer!: UserService;
  constructor() {}

  public static async getInstance() {
    if (this._instance) {
      this._instance = new AuthService();
      await this._instance.initCollections();
    }
    return this._instance;
  }

  private async initCollections() {
    this.userSer = await UserService.getInstance();
  }

  public async login({ username, password }: LoginAuthInput) {
    const user = await this.userSer.findByUsername(username);

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
