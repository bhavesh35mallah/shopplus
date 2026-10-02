import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoutes from "./routes/healthRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "⚡ ShopPulse Backend API is running",
    healthCheck: "/api/health",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/health", healthRoutes);

export default app;