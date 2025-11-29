export interface EnvConfig {
  appPort: string;
  jwt_secret: string;
  secret: string;

  mongoUri: string;
}

export default function envConfig(): EnvConfig {
  const env = Bun.env;

  const config = {
    appPort: env.APP_PORT || "3000",
    jwt_secret: env.JWT_SECRET || "super-secret-key",
    secret: env.SECRET || "super-secret-key",
    mongoUri: env.MONGO_URI || "mongodb://localhost:27017/database",
  };

  return config;
}
