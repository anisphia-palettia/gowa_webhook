import { MongoDB } from "../database/MongoDB";
import { seedUsers } from "../database/seed/user_seed";

async function seed() {
  const mongo = MongoDB.getInstance();
  const db = await mongo.connect();

  try {
    await seedUsers(db);
    console.log("Seeding selesai");
  } catch (err) {
    console.error("Error saat seeding:", err);
  } finally {
    await mongo.disconnect();
  }
}

seed();
