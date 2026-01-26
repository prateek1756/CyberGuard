import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import scannerRoutes from "./routes/scanner";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "CyberGuard API is running";
    res.json({ message: ping, timestamp: new Date().toISOString() });
  });

  app.get("/api/demo", handleDemo);
  
  // Scanner routes
  app.use("/api/scanner", scannerRoutes);

  return app;
}
