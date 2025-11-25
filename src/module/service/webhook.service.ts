import { ConnectionCheckOutStartedEvent, type Db } from "mongodb";
import MessageService from "./message.service";

export default class WebhookService {
  private messageService: MessageService;

  constructor(db: Db) {
    this.messageService = new MessageService(db);
  }

  async handleMessage(data: any) {
    if (data.message) {
      console.log(data);
      // return await this.messageService.create(data);
    }
  }
}
