import { z } from "zod";

export const clientSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  telephone: z.string(),
  createdAt: z.string(),
});

export const clientSchemaRequest = clientSchema.omit({
  id: true,
  createdAt: true,
});

export type TClientRequest = z.infer<typeof clientSchemaRequest>;
