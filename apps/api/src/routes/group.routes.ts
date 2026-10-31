import { Router } from "express";
import { param } from "express-validator";
import { GroupCreateSchema, GroupUpdateSchema, GroupApplicationSchema } from "../validations/group.validations.js";
import { validate } from "../middleware/validate.js";
import { GroupController, ApplicationController, DocumentController, PaymentController } from "../controllers/group.controller.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Open IPL API v1.0" });
});

router.post("/", validate(GroupCreateSchema, "body"), (req, res, next) => {
  GroupController.create(req, res, next).catch(next);
});

router.get("/:groupId", (req, res, next) => {
  GroupController.get(req, res, next).catch(next);
});

router.patch(
  "/:groupId",
  param("groupId").isString().withMessage("groupId is required"),
  validate(GroupUpdateSchema, "body"),
  (req, res, next) => {
    GroupController.update(req, res, next).catch(next);
  }
);

router.delete("/:groupId", (req, res, next) => {
  GroupController.delete(req, res, next).catch(next);
});

router.post("/:groupId/applications", validate(GroupApplicationSchema, "body"), (req, res, next) => {
  ApplicationController.create(req, res, next).catch(next);
});

router.get("/:groupId/applications", (req, res, next) => {
  ApplicationController.list(req, res, next).catch(next);
});

router.patch("/:groupId/applications/:applicationId", (req, res, next) => {
  ApplicationController.approve(req, res, next).catch(next);
});

router.patch("/:groupId/applications/:applicationId/reject", (req, res, next) => {
  ApplicationController.reject(req, res, next).catch(next);
});

router.post("/:groupId/documents", (req, res, next) => {
  DocumentController.upload(req, res, next).catch(next);
});

router.post("/:groupId/payments", validate(GroupCreateSchema, "body"), (req, res, next) => {
  PaymentController.create(req, res, next).catch(next);
});

router.get("/:groupId/payments", (req, res, next) => {
  PaymentController.list(req, res, next).catch(next);
});

router.get("/:groupId/payments/:paymentId", (req, res, next) => {
  PaymentController.get(req, res, next).catch(next);
});

export default router;
