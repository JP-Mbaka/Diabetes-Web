import { z } from "zod";

export const AuthFormSchema = () =>
  z.object({
    preg: z.coerce.number(),
    plas: z.coerce.number(),
    pres: z.coerce.number(),
    skin: z.coerce.number(),
    insu: z.coerce.number(),
    mass: z.coerce.number(),
    pedi: z.coerce.number(),
    age: z.coerce.number(),
  });
