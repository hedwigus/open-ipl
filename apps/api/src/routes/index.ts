import { Router } from "express";
import healthRouter from "./health.routes.js";
import groupRouter from "./group.routes.js";

const router = Router();

router.use("/health", healthRouter);
router.use("/groups", groupRouter);

export default router;
