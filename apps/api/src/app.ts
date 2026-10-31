import express from "express";
import { PrismaClient } from "@prisma/client";
import { AppError, ValidationError } from "./middleware/errors.js";
import { validate } from "./middleware/validate.js";
import groupRouter from "./routes/group.routes.js";
import healthRouter from "./routes/health.routes.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/api/v1/health", (_request, response) => {
    response.json({
      status: "ok",
      service: "open-ipl-api",
      version: "1.0.0",
    });
  });

  app.use("/api/v1", groupRouter);
  app.use("/api/v1", healthRouter);

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = new Error("Not Found") as any;
    error.statusCode = 404;
    next(error);
  });

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: err.message || "Internal Server Error",
    });
  });

  return app;
}
