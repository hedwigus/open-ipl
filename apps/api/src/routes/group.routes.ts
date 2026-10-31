import { Router } from "express";
import { body, param } from "express-validator";
import { GroupCreateSchema, GroupUpdateSchema } from "../validations/group.validations.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Open IPL API v1.0" });
});

router.post(
  "/",
  body("name").isString().notEmpty().withMessage("name is required"),
  body("type").isString().notEmpty().withMessage("type is required"),
  validate(GroupCreateSchema, "body"),
  (req, res) => {
    res.json({ status: "ok", message: "group created" });
  }
);

router.get("/:groupId", (req, res) => {
  res.json({ status: "ok", groupId: req.params.groupId });
});

router.patch(
  "/:groupId",
  param("groupId").isString().withMessage("groupId is required"),
  validate(GroupUpdateSchema, "body"),
  (req, res) => {
    res.json({ status: "ok", message: "group updated" });
  }
);

router.delete("/:groupId", (req, res) => {
  res.json({ status: "ok", message: "group deleted" });
});

export default router;
