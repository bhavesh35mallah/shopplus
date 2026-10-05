import { Router } from "express";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/status", updateUserStatus);

export default router;
