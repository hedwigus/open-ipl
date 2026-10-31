import { z } from "zod";

export const GroupApplySchema = z.object({
  groupId: z.string().cuid().regex(/^[A-Za-z0-9_-]+$/, "Invalid group id"),
});

export const GroupApplicationSchema = z.object({
  groupId: z.string().cuid().regex(/^[A-Za-z0-9_-]+$/, "Invalid group id"),
  memberId: z.string().cuid().regex(/^[A-Za-z0-9_-]+$/, "Invalid member id"),
});

export const ApplicationStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"], {
  message: "Status must be PENDING, APPROVED, or REJECTED",
});

export const GroupCreateSchema = z.object({
  name: z.string().min(1, "Name is required").max(255).trim(),
  type: z.enum(["FAMILY", "SCHOOL_CLASS", "COMMUNITY", "OTHER"]),
  address: z.string().max(500).optional(),
  leaderId: z.string().cuid().regex(/^[A-Za-z0-9_-]+$/, "Invalid leader id").optional(),
  memberCap: z.number().int().positive().max(1000).optional().default(30),
  duesAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount").optional(),
  duesFrequency: z.enum(["MONTHLY", "YEARLY", "ONCE"]).optional().default("MONTHLY"),
  adsEnabled: z.boolean().optional().default(false),
  status: z.enum(["PENDING", "ACTIVE", "CLOSED"]).optional().default("PENDING"),
});

export const GroupUpdateSchema = GroupCreateSchema.partial();

export type GroupCreateInput = z.infer<typeof GroupCreateSchema>;
export type GroupApplyInput = z.infer<typeof GroupApplySchema>;
export type GroupUpdateInput = z.infer<typeof GroupUpdateSchema>;
export type GroupApplicationInput = z.infer<typeof GroupApplicationSchema>;
