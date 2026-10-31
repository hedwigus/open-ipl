import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ValidationError } from "../middleware/errors.js";
import { GroupCreateSchema, GroupUpdateSchema, GroupApplicationSchema } from "../validations/group.validations.js";
import { prisma } from "../config/database.js";

interface PaymentBody {
  amount?: string;
  currency?: string;
  provider?: string;
  method?: string;
  message?: string;
  memberId?: string;
}

export class GroupController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = GroupCreateSchema.parse(req.body);
      const group = await prisma.group.create({
        data: {
          name: body.name,
          type: body.type,
          address: body.address,
          leaderId: body.leaderId,
          memberCap: body.memberCap,
          duesAmount: body.duesAmount,
          duesFrequency: body.duesFrequency,
          adsEnabled: body.adsEnabled,
          status: body.status,
        },
      });
      res.status(201).json({ status: "ok", data: group });
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.issues.map((e) => ({ field: String(e.path.join(".")), message: e.message }));
        return next(new ValidationError("Validation failed", issues));
      }
      next(err);
    }
  };

  static get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groupId } = req.params;
      const group = await prisma.group.findUnique({ where: { id: groupId } });
      if (!group) {
        return res.status(404).json({ status: "error", message: "Group not found" });
      }
      res.json({ status: "ok", data: group });
    } catch (err) {
      next(err);
    }
  };

  static update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groupId } = req.params;
      const body = GroupUpdateSchema.parse(req.body);
      const group = await prisma.group.update({
        where: { id: groupId },
        data: {
          name: body.name,
          type: body.type,
          address: body.address,
          leaderId: body.leaderId,
          memberCap: body.memberCap,
          duesAmount: body.duesAmount,
          duesFrequency: body.duesFrequency,
          adsEnabled: body.adsEnabled,
          status: body.status,
        },
      });
      res.json({ status: "ok", data: group });
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.issues.map((e) => ({ field: String(e.path.join(".")), message: e.message }));
        return next(new ValidationError("Validation failed", issues));
      }
      if ((err as Error).message?.includes("Group not found")) {
        return res.status(404).json({ status: "error", message: "Group not found" });
      }
      next(err);
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groupId } = req.params;
      await prisma.group.delete({ where: { id: groupId } });
      res.json({ status: "ok", message: "Group deleted" });
    } catch (err) {
      if ((err as Error).message?.includes("Group not found")) {
        return res.status(404).json({ status: "error", message: "Group not found" });
      }
      next(err);
    }
  };
}

export class ApplicationController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = GroupApplicationSchema.parse(req.body);
      const application = await prisma.application.create({
        data: { 
          groupId: body.groupId, 
          memberId: body.memberId,
          status: "PENDING" 
        },
        include: { group: true },
      });
      res.status(201).json({ status: "ok", data: application });
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.issues.map((e) => ({ field: String(e.path.join(".")), message: e.message }));
        return next(new ValidationError("Validation failed", issues));
      }
      next(err);
    }
  };

  static list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groupId } = req.params;
      const applications = await prisma.application.findMany({
        where: { groupId },
        include: { group: true },
      });
      res.json({ status: "ok", data: applications });
    } catch (err) {
      next(err);
    }
  };

  static approve = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { applicationId } = req.params;
      const application = await prisma.application.update({
        where: { id: applicationId },
        data: { status: "APPROVED" },
      });
      res.json({ status: "ok", data: application });
    } catch (err) {
      next(err);
    }
  };

  static reject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { applicationId } = req.params;
      const application = await prisma.application.update({
        where: { id: applicationId },
        data: { status: "REJECTED" },
      });
      res.json({ status: "ok", data: application });
    } catch (err) {
      next(err);
    }
  };
}

export class DocumentController {
  static upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groupId } = req.params;
      const { url, filename, mimeType, size } = req.body;
      const document = await prisma.document.create({
        data: {
          groupId,
          url: url || "",
          filename: filename || "",
          mimeType: mimeType || "",
          size: Number(size) || 0
        },
      });
      res.status(201).json({ status: "ok", data: document });
    } catch (err) {
      next(err);
    }
  };
}

export class PaymentController {
  static create = async (req: Request<any, any, PaymentBody>, res: Response, next: NextFunction) => {
    try {
      const { groupId } = req.params;
      const { amount, currency, provider, method, message, memberId } = req.body as PaymentBody;
      const referenceId = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const payment = await prisma.payment.create({
        data: {
          groupId,
          memberId: memberId || "",
          amount: new Prisma.Decimal(String(amount) || "0"),
          currency: currency || "IDR",
          provider: provider || "MIDSNAP",
          method: method || "QRIS",
          message: message || null,
          referenceId,
          status: "PENDING",
        },
      });
      res.status(201).json({ status: "ok", data: payment });
    } catch (err) {
      next(err);
    }
  };

  static list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groupId } = req.params;
      const payments = await prisma.payment.findMany({
        where: { groupId },
        orderBy: { createdAt: "desc" },
      });
      res.json({ status: "ok", data: payments });
    } catch (err) {
      next(err);
    }
  };

  static get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groupId, paymentId } = req.params;
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId, groupId },
      });
      if (!payment) {
        return res.status(404).json({ status: "error", message: "Payment not found" });
      }
      res.json({ status: "ok", data: payment });
    } catch (err) {
      next(err);
    }
  };
}
