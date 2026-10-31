import express from "express";

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
  return app;
}
