import { UserCollection } from "../user.collection";
import { UserRole } from "../../model/user.model";

export async function seedUsers() {
  const userCol = await UserCollection.getInstance();
  await userCol.collection.updateOne(
    { username: "admin" },
    {
      $set: {
        name: "Admin",
        username: "admin",
        password: await Bun.password.hash("admin"),
        role: UserRole.admin,
      },
    },
    { upsert: true },
  );

  console.log("Admin user created successfully");
}
