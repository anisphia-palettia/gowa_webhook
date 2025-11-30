import { UserCollection } from "../user.collection";
import { UserRole } from "../../model/user.model";

export async function seedUsers() {
  const userCol = await UserCollection.getInstance();
  await userCol.({
    name: "Admin",
    username: "admin",
    password: await Bun.password.hash("admin"),
    role: UserRole.admin,
  });

  console.log("Admin user created successfully");
}
