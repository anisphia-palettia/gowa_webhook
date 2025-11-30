import type { Db } from "mongodb";
import honoFactory from "../../lib/hono_factory";
import AuthService from "../service/auth.service";
import zodValidator from "../middleware/zod_validator";
import { loginAuthSchema } from "../schema/auth.schema";
import api_response from "../../helper/api_response";
import { setCookie } from "hono/cookie";
import { hashToken } from "../../helper/token";

export default class AuthHandler {
  public app = honoFactory.createApp();
  private authService: AuthService;
  constructor(db: Db) {
    this.authService = new AuthService(db);
    this.routes();
  }

  private routes() {
    (this.app.post(
      "/login",
      zodValidator("json", loginAuthSchema),
      async (c) => {
        const validated = c.req.valid("json");
        const token = await this.authService.login(validated);
        setCookie(c, "session_token", token);
        const refreshToken = hashToken(token);
        setCookie(c, "refresh_token", refreshToken);
        return api_response.success(c, {
          message: "Login successful",
        });
      },
    ),
      this.app.get("/me"));
  }
}
