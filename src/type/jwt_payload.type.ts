import type { UserRole } from "../model/user.model";
import type { JWTPayload } from "hono/utils/jwt/types";

export interface JwtPayload extends JWTPayload {
  user: {
    userId: string;
    role: UserRole;
  };
}
