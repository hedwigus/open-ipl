import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    service: "open-ipl-api",
    status: "ok",
    version: "1.0.0",
    db: process.env.NODE_ENV === "development" ? "sqlite" : "postgres",
  });
});

export default router;
