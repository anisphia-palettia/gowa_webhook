import { ConnectionCheckOutStartedEvent, type Db } from "mongodb";
import MessageService from "./message.service";
import type { WebhookPayload } from "../../type/webhook.type";

export default class WebhookService {
  private messageService: MessageService;

  constructor(db: Db) {
    this.messageService = new MessageService(db);
  }

  async insertMessage(data: WebhookPayload) {
    return await this.messageService.insert(data);
  }
}
