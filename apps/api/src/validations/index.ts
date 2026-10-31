import { z } from "zod";

export const ValidationSchema = z.object({
  body: z.any(),
  query: z.any(),
  params: z.any(),
});

export type ValidationSchemaType = z.infer<typeof ValidationSchema>;
