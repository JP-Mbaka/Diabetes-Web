import { z } from "zod";

export const AuthFormSchema = () =>
  z.object({
    preg: z.number(),
    plas: z.number(),
    pres: z.number(),
    skin: z.number(),
    insu: z.number(),
    mass: z.number(),
    pedi: z.number(),
    age: z.number(),
  });
