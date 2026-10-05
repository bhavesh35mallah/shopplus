import { Router } from "express";

import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getProducts);

router.get("/:slug", getProduct);

router.post(
    "/",
    protect,
    adminOnly,
    createProduct
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateProduct
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProduct
);

export default router;