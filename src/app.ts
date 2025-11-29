import { MongoDB } from "./database/MongoDB";
import honoFactory from "./lib/hono_factory";
import AuthHandler from "./module/handler/auth.handler";
import UserHandler from "./module/handler/user.handler";
import WebhookHandler from "./module/handler/webhook.handler";

const app = honoFactory.createApp();
const mongo = MongoDB.getInstance();
const db = await mongo.connect();

const userHandler = new UserHandler(db);
const authHandler = new AuthHandler(db);
const webhookHandler = new WebhookHandler(db);

app.route("/users", userHandler.app);
app.route("/auth", authHandler.app);
app.route("/webhook", webhookHandler.app);

export default app;
