import { z } from "zod";

export const DocumentSchema = z.object({
  groupId: z.string().cuid().regex(/^[A-Za-z0-9_-]+$/, "Invalid group id"),
  filename: z.string().min(1).max(500),
  url: z.string().url({ message: "A valid file URL is required" }),
  mimeType: z.string().max(100),
  size: z.number().int().nonnegative(),
  uploaderId: z.string().cuid().regex(/^[A-Za-z0-9_-]+$/, "Invalid uploader id").optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional().default("PENDING"),
});

export type DocumentInput = z.infer<typeof DocumentSchema>;
