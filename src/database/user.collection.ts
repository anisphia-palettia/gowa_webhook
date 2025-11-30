import { ObjectId, type Collection } from "mongodb";
import { MongoDB } from "./mongodb";
import type { UserDoc } from "../model/user.model";

export class UserCollection extends MongoDB {
  private static _instance: UserCollection;
  private _collection: Collection<UserDoc> | null = null;

  private constructor() {
    super();
  }

  static async getInstance(): Promise<UserCollection> {
    if (!UserCollection._instance) {
      UserCollection._instance = new UserCollection();
      await MongoDB.connectBase();
      UserCollection._instance.initCollection();
    }
    return UserCollection._instance;
  }

  private initCollection() {
    const db = this.getDb();
    this._collection = db.collection<UserDoc>("users");
    this._collection
      .createIndex({ username: 1 }, { unique: true })
      .catch(console.error);
  }

  get collection(): Collection<UserDoc> {
    if (!this._collection) {
      throw new Error("UserCollection not initialized");
    }
    return this._collection;
  }

  async create(doc: UserDoc) {
    return this.collection.insertOne(doc);
  }

  async findById(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async deleteById(id: string) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async upsertById(id: string, doc: UserDoc) {
    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: doc },
      { upsert: true },
    );
  }

  async upsert(doc: UserDoc) {
    return this.collection.updateOne(
      { username: doc.username },
      { $set: doc },
      { upsert: true },
    );
  }
}
