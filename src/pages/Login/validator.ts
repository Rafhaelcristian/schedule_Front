import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Deve ser um e-mail válido.")
    .nonempty("E-mail é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória."),
});

export type TLogin = z.infer<typeof loginSchema>;
