import type { OptionalId } from "mongodb";
import type { CreateUserInput } from "../schema/user.schema";
import { HTTPException } from "hono/http-exception";
import type { UserDoc } from "../../model/user.model";
import { UserCollection } from "../../database/user.collection";

export default class UserService {
  private static _instance: UserService;

  private userCol!: UserCollection;

  constructor() {}

  static async getInstance() {
    if (!this._instance) {
      this._instance = new UserService();
      await this._instance.initCollections();
    }
    return this._instance;
  }

  private async initCollections() {
    this.userCol = await UserCollection.getInstance();
  }

  async insert(data: CreateUserInput) {
    const user = await this.findByUsername(data.username);
    if (user) throw new HTTPException(400, { message: "User already exists" });

    const hashedPassword = await Bun.password.hash(data.password);

    const newUser: OptionalId<UserDoc> = {
      username: data.username,
      name: data.name,
      password: hashedPassword,
      role: data.role,
    };

    const result = await this.userCol.collection.insertOne(newUser);
    return result;
  }

  async findByUsername(username: string) {
    const user = await this.userCol.collection.findOne({
      username,
    });
    return user;
  }
}
