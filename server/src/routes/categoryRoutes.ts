import { Router } from "express";

import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getCategories);

router.get("/:slug", getCategory);

router.post(
    "/",
    protect,
    adminOnly,
    createCategory
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateCategory
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteCategory
);

export default router;