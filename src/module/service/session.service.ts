import type { Collection, Db } from "mongodb";
import type { SessionModel } from "../../model/session.model";

export class SessionService {
  private collection: Collection;
  constructor(db: Db) {
    this.collection = db.collection("sessions");
  }

  async insert(data: SessionModel) {
    data.last_activity = new Date();
    await this.collection.insertOne(data);
  }
}
