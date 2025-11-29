import { type WithoutId } from "mongodb";
import { MongoDB } from "./MongoDB";
import { UserRole, type UserModel } from "../model/user.model";

async function seedUsers() {
  const mongo = MongoDB.getInstance();
  const db = await mongo.connect();

  const hashedPassword = await Bun.password.hash("admin");

  const adminUser: WithoutId<UserModel> = {
    name: "Admin",
    username: "admin",
    password: hashedPassword,
    role: UserRole.admin,
  };
  await db
    .collection<WithoutId<UserModel>>("users")
    .updateOne(
      { username: adminUser.username },
      { $setOnInsert: adminUser },
      { upsert: true },
    );
  console.log("Admin user created successfully");
}

seedUsers()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
