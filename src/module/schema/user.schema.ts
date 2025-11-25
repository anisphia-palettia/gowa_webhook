import z from "zod";

export const userSchema = {
  insert: z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
  }),
};

export type UserInputSchema = z.infer<typeof userSchema.insert>;
