import honoFactory from "../../lib/hono_factory";
import zodValidatorMiddleware from "../middleware/zod_validator";
import { createUserSchema } from "../schema/user.schema";
import api_response from "../../helper/api_response";
import UserService from "../service/user.service";

export default class UserHandler {
  public app = honoFactory.createApp();

  constructor() {
    this.routes();
  }

  private routes() {
    // CREATE USER
    this.app.post(
      "/",
      zodValidatorMiddleware("json", createUserSchema),
      async (c) => {
        const service = await UserService.getInstance();
        const data = c.req.valid("json");
        const user = await service.insert(data);
        return api_response.success(c, {
          message: "User created successfully",
          data: user,
        });
      },
    );
  }
}
