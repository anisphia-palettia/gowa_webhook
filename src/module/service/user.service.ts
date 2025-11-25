import type { Collection, Db } from "mongodb";
import type { UserInputSchema } from "../schema/user.schema";
import { HTTPException } from "hono/http-exception";

export default class UserService {
  private collection: Collection;

  constructor(db: Db) {
    this.collection = db.collection("users");
  }

  async insert(data: UserInputSchema) {
    const user = await this.findByUsername(data.username);
    if (user) throw new HTTPException(400, { message: "User already exists" });

    const hashedPassword = await Bun.password.hash(data.password);
    const result = await this.collection.insertOne({
      ...data,
      password: hashedPassword,
    });
    return result;
  }

  async findByUsername(username: string) {
    const user = await this.collection.findOne({ username });
    return user;
  }
}
