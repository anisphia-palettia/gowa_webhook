import { Db, type WithoutId } from "mongodb";
import { UserRole, type UserModel } from "../../model/user.model";

export async function seedUsers(db: Db) {
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
