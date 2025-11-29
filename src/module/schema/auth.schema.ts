import z from "zod";

export const loginAuthSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginAuthInput = z.infer<typeof loginAuthSchema>;
