import { Request, Response, NextFunction } from "express";
import { ValidationError } from "./errors.js";
import { z, ZodError } from "zod";

export function validate(
  schema: z.ZodTypeAny,
  prop: "body" | "query" | "params" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[prop]);
      req[prop] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.issues.map((e) => ({
          field: String(e.path.join(".")),
          message: e.message,
        }));
        return next(new ValidationError("Validation failed", issues));
      }
      next(err);
    }
  };
}
