export interface EnvConfig {
  appPort: string;
  secret: string;

  mongoUri: string;
}

export default function envConfig(): EnvConfig {
  const env = Bun.env;

  const config = {
    appPort: env.APP_PORT || "3000",
    secret: env.SECRET || "super-secret-key",
    mongoUri: env.MONGO_URI || "mongodb://localhost:27017/database",
  };

  return config;
}
