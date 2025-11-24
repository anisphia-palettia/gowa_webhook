import honoFactory from "./lib/hono_factory";
import webhookHandler from "./module/handler/webhook.handler";

const app = honoFactory.createApp();

app.route("", webhookHandler);

export default app;
