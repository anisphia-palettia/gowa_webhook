import type { Collection, Db, OptionalId, WithId } from "mongodb";
import type { CreateUserInput } from "../schema/user.schema";
import { HTTPException } from "hono/http-exception";
import type { UserModel } from "../../model/user.model";

export default class UserService {
  private collection: Collection;

  constructor(db: Db) {
    this.collection = db.collection("users");
  }

  async insert(data: CreateUserInput) {
    const user = await this.findByUsername(data.username);
    if (user) throw new HTTPException(400, { message: "User already exists" });

    const hashedPassword = await Bun.password.hash(data.password);

    const newUser: OptionalId<UserModel> = {
      username: data.username,
      name: data.name,
      password: hashedPassword,
      role: data.role,
    };

    const result = await this.collection.insertOne(newUser);
    return result;
  }

  async findByUsername(username: string) {
    const user = await this.collection.findOne<WithId<UserModel>>({ username });
    return user;
  }
}
