import { MongoDB } from "./database/MongoDB";
import honoFactory from "./lib/hono_factory";
import UserHandler from "./module/handler/user.handler";
import WebhookHandler from "./module/handler/webhook.handler";

const app = honoFactory.createApp();
const mongo = MongoDB.getInstance();
const db = await mongo.connect();

const userHandler = new UserHandler(db);
const webhookHandler = new WebhookHandler(db);

app.route("/users", userHandler.app);
app.route("/webhook", webhookHandler.app);

export default app;
