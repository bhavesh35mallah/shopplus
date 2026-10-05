import { Router } from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  getDashboardAnalytics,
} from "../controllers/orderController.js";

const router = Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);
router.get("/analytics/dashboard", getDashboardAnalytics);

export default router;
