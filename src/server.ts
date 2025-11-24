import app from "./app";
import { MongoDB } from "./database/MongoDB";

async function bootstrap() {
  Bun.serve({
    fetch: app.fetch,
    port: Bun.env.APP_PORT,
    hostname: "0.0.0.0",
  });

  const mongo = MongoDB.getInstance();
  await mongo.connect();

  console.log(`Server started on port ${Bun.env.APP_PORT}`);
}

bootstrap();
