import { type Collection } from "mongodb";
import { MongoDB } from "./mongodb";
import type { UserDoc } from "../model/user.model";

export class UserCollection extends MongoDB {
  private static _instance: UserCollection;
  private _collection: Collection<UserDoc> | null = null;

  private constructor() {
    super();
  }

  static async getInstance(): Promise<UserCollection> {
    if (!this._instance) {
      this._instance = new UserCollection();
      await MongoDB.connectBase();
      this._instance.initCollection();
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
}
