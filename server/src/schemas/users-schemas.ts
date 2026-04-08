import { z } from "zod";

export const registerBodySchema = z.object({
  name: z.string().min(1),
  password: z.string().min(6),
});

export const loginBodySchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
