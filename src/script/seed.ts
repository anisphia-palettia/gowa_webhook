import { MongoDB } from "../database/mongodb";
import { seedUsers } from "../database/seed/user_seed";

async function seed() {
  try {
    await seedUsers();
    console.log("Seeding selesai");
  } catch (err) {
    console.error("Error saat seeding:", err);
  } finally {
    await MongoDB.disconnectBase();
  }
}

seed();
