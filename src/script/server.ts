import app from "../app";

async function bootstrap() {
  Bun.serve({
    fetch: app.fetch,
    port: Bun.env.APP_PORT,
    hostname: "0.0.0.0",
  });

  console.log(`Server started on port ${Bun.env.APP_PORT}`);
}

bootstrap();
