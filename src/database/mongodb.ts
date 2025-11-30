import { MongoClient, type Db } from "mongodb";
import envConfig from "../config/env";

export class MongoDB {
  protected static _client: MongoClient;
  protected static _db: Db | null;

  protected constructor() {
    const uri = envConfig().mongoUri;
    if (!MongoDB._client) {
      MongoDB._client = new MongoClient(uri);
      MongoDB._db = null;
    }
  }

  protected static async connectBase(): Promise<Db> {
    if (this._db) return this._db;
    await this._client.connect();
    this._db = this._client.db();
    console.log("MongoDB connected");
    return this._db;
  }

  static async disconnectBase(): Promise<void> {
    if (this._client) {
      await this._client.close();
      this._db = null;
      console.log("MongoDB disconnected");
    }
  }

  protected getDb(): Db {
    if (!MongoDB._db) {
      throw new Error("MongoDB not connected. Call connect() first.");
    }
    return MongoDB._db;
  }
}
