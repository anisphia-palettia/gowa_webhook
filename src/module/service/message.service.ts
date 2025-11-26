import type { Collection, Db } from "mongodb";

export default class MessageService {
  private collection: Collection;
  constructor(db: Db) {
    this.collection = db.collection("messages");
  }

  async insert(data: any) {
    return this.collection.insertOne(data);
  }

  async findByChatId(chatId: string) {
    return this.collection.find({ chat_id: chatId }).toArray();
  }
}
