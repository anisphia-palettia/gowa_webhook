import { HTTPException } from "hono/http-exception";
import honoFactory from "../../lib/hono_factory";
import verifyWebhookSignature from "../../helper/verify_webhook_signature";
import { MongoDB } from "../../database/MongoDB";
import MessageService from "../service/message.service";

const webhookHandler = honoFactory.createApp();
const mongo = MongoDB.getInstance();
const db = await mongo.connect();
const messageService = new MessageService(db);

webhookHandler.post("/webhook", async (c) => {
  const signature = c.req.header("x-hub-signature-256");

  if (!signature) {
    console.log("Missing signature");
    throw new HTTPException(400, { message: "Missing signature" });
  }

  const payload = await c.req.text();
  const secret = Bun.env.SECRET;

  if (!secret) {
    console.log("Missing secret");
    throw new HTTPException(400, { message: "Missing secret" });
  }

  if (!verifyWebhookSignature(payload, signature, secret)) {
    return c.json({ error: "Invalid signature" }, 400);
  }

  const data = JSON.parse(payload);

  console.log(data);

  if (data.event === "message.ack") {
    console.log(`Message ${data.payload.receipt_type}:`, {
      chat_id: data.payload.chat_id,
      message_ids: data.payload.ids,
      description: data.payload.receipt_type_description,
    });
  } else if (data.event === "group.participants") {
    console.log(`Group ${data.payload.type} event:`, {
      chat_id: data.payload.chat_id,
      type: data.payload.type,
      affected_users: data.payload.jids,
    });

    switch (data.payload.type) {
      case "join":
        console.log(
          `${data.payload.jids.length} users joined group ${data.payload.chat_id}`,
        );
        data.payload.jids.forEach((jid: any) => {
          console.log(`Welcome ${jid} to the group!`);
        });
        break;
      case "leave":
        console.log(
          `${data.payload.jids.length} users left group ${data.payload.chat_id}`,
        );
        break;
      case "promote":
        console.log(
          `${data.payload.jids.length} users promoted in group ${data.payload.chat_id}`,
        );
        break;
      case "demote":
        console.log(
          `${data.payload.jids.length} users demoted in group ${data.payload.chat_id}`,
        );
        break;
    }
  } else if (data.action === "message_deleted_for_me") {
    console.log("Message deleted:", data.deleted_message_id);
  } else if (data.action === "message_revoked") {
    console.log("Message revoked:", data.revoked_message_id);
  } else if (data.message) {
    await messageService.create(data);
  }

  return c.json({ message: "Webhook received" }, 200);
});

export default webhookHandler;
