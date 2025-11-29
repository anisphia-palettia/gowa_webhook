import z from "zod";
import { UserRole } from "../../model/user.model";

export const createUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.enum(UserRole).default(UserRole.user),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
