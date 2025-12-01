import { errorHandling } from "./helper/error_handling";
import honoFactory from "./lib/hono_factory";
import UserHandler from "./module/handler/user.handler";

const app = honoFactory.createApp();

const userHandler = new UserHandler();

app.route("/users", userHandler.app);

app.onError(errorHandling);
export default app;
