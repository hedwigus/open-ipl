import { z } from "zod";

export const CreatePaymentSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Amount must be a positive number with up to 2 decimals"),
  currency: z.string().max(3).default("IDR"),
  groupId: z.string().cuid().regex(/^[A-Za-z0-9_-]+$/, "Invalid group id"),
  referenceId: z.string().min(1).max(255).optional(),
  provider: z.enum(["MIDSNAP", "STRIPE"]).optional().default("MIDSNAP"),
  method: z.enum(["QRIS", "GOPAY", "CREDIT_CARD", "VND_PAY"]).optional().default("QRIS"),
});

export const PaymentStatusSchema = z.enum(["PENDING", "SUCCESS", "FAILED", "REFUNDED"]);

export const CreatePaymentResponseSchema = z.object({
  id: z.string(),
  status: PaymentStatusSchema,
  amount: z.string(),
  currency: z.string(),
  referenceId: z.string(),
  provider: z.string(),
  providerTxId: z.string().nullable(),
  message: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CreatePaymentInput = z.infer<typeof CreatePaymentSchema>;
export type CreatePaymentResponse = z.infer<typeof CreatePaymentResponseSchema>;
