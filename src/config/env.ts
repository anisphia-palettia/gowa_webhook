export interface EnvConfig {
  appPort: string;
  secret: string;
  jwtSecret: string;

  mongoUri: string;
}

export default function envConfig(): EnvConfig {
  const env = Bun.env;

  return {
    appPort: env.APP_PORT || "3000",
    secret: env.SECRET || "super-secret-key",
    jwtSecret: env.JWT_SECRET || "",

    mongoUri: env.MONGO_URI || "mongodb://localhost:27017/database",
  };
}
