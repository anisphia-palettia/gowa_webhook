import { MongoClient, type Db } from "mongodb";
import envConfig from "../config/env";

export class MongoDB {
  private static instance: MongoDB;
  private client: MongoClient;
  private db: Db | null = null;

  private constructor() {
    const uri = envConfig().mongoUri;
    this.client = new MongoClient(uri);
  }

  static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }
    await this.client.connect();
    this.db = this.client.db();
    console.log("MongoDB connected (singleton)");
    return this.db;
  }
}
