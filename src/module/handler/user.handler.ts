import { Db } from "mongodb";
import UserService from "../service/user.service";
import honoFactory from "../../lib/hono_factory";
import zodValidatorMiddleware from "../middleware/zod_validator";
import { userSchema } from "../schema/user.schema";
import api_response from "../../helper/api_response";

export default class UserHandler {
  public app = honoFactory.createApp();
  private userService: UserService;
  constructor(db: Db) {
    this.userService = new UserService(db);
    this.routes();
  }

  private routes() {
    // CREATE USER
    this.app.post(
      "/",
      zodValidatorMiddleware("json", userSchema.insert),
      async (c) => {
        const data = c.req.valid("json");
        const user = await this.userService.insert(data);
        return api_response.successResponse(c, {
          message: "User created successfully",
          data: user,
        });
      },
    );
  }
}
