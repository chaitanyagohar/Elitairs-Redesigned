// src/lib/validators.ts
import { ZodError, ZodSchema } from "zod";

export function parseSchema<T>(schema: ZodSchema<T>, data: unknown) {
  try {
    const parsed = schema.parse(data);
    return { ok: true, data: parsed };
  } catch (e) {
    if (e instanceof ZodError) {
      return { ok: false, error: e.flatten() };
    }
    return { ok: false, error: e };
  }
}
