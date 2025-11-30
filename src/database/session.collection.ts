import type { Collection } from "mongodb";
import { MongoDB } from "./mongodb";
import type { SessionDoc } from "../model/session.model";

export class SessionCollection extends MongoDB {
  private static _instance: SessionCollection;
  private _collection: Collection<SessionDoc> | null = null;

  private constructor() {
    super();
  }

  static async getInstance(): Promise<SessionCollection> {
    if (!SessionCollection._instance) {
      SessionCollection._instance = new SessionCollection();
      await MongoDB.connectBase();
      SessionCollection._instance.initCollection();
    }
    return SessionCollection._instance;
  }

  private initCollection() {
    const db = this.getDb();
    this._collection = db.collection<SessionDoc>("sessions");
    this._collection
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
      .catch(console.error);
  }

  get collection(): Collection<SessionDoc> {
    if (!this._collection) {
      throw new Error("SessionCollection not initialized");
    }
    return this._collection;
  }

  async create(doc: SessionDoc) {
    return this.collection.insertOne(doc);
  }

  async findBySessionId(sessionId: string) {
    return this.collection.findOne({ sessionId });
  }

  async deleteBySessionId(sessionId: string) {
    return this.collection.deleteOne({ sessionId });
  }
}
