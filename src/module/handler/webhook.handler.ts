import { HTTPException } from "hono/http-exception";
import verifyWebhookSignature from "../../helper/verify_webhook_signature";
import honoFactory from "../../lib/hono_factory";
import type { Db } from "mongodb";
import envConfig from "../../config/env";
import WebhookService from "../service/webhook.service";
import type { Context } from "hono";
import type { WebhookPayload } from "../../type/webhook.type";

export default class WebhookHandler {
  public app;
  private secret: string;
  private webhookService: WebhookService;

  constructor(db: Db) {
    const env = envConfig();
    this.app = honoFactory.createApp();
    this.secret = env.secret;
    this.webhookService = new WebhookService(db);

    this.routes();
  }

  private async verify(c: Context): Promise<WebhookPayload> {
    const signature = c.req.header("x-hub-signature-256");

    if (!signature) {
      throw new HTTPException(400, { message: "Missing signature" });
    }

    if (!this.secret) {
      throw new HTTPException(400, { message: "Missing secret" });
    }

    const payload = await c.req.text();

    const valid = verifyWebhookSignature(payload, signature, this.secret);
    if (!valid) {
      throw new HTTPException(400, { message: "Invalid signature" });
    }

    return JSON.parse(payload);
  }

  private routes() {
    this.app.post("/", async (c) => {
      const data = await this.verify(c);

      if ("message" in data) {
        await this.webhookService.insertMessage(data);
      }
      return c.json({ message: "Webhook received" });
    });
  }
}
