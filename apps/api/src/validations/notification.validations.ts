import { z } from "zod";

export const NotificationSchema = z.object({
  type: z.enum(["DUE_REMINDER", "PAYMENT_CONFIRMED", "GROUP_APPROVED", "PAYMENT_FAILED", "ADMIN", "SYSTEM"]),
  payload: z.any(),
});

export type NotificationInput = z.infer<typeof NotificationSchema>;
