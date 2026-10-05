import { Request, Response } from "express";

import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { slugify } from "../utils/slugify.js";

export const createProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            name,
            sku,
            description,
            price,
            compareAtPrice,
            images,
            category,
            brand,
            tags,
            eventTags,
            stock,
        } = req.body;

        if (
            !name ||
            !sku ||
            !description ||
            price === undefined ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "Required product fields are missing",
            });
        }

        const categoryExists =
            await Category.findById(category);

        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Invalid category",
            });
        }

        const existingSku = await Product.findOne({
            sku: sku.toUpperCase(),
        });

        if (existingSku) {
            return res.status(409).json({
                success: false,
                message: "SKU already exists",
            });
        }

        const product = await Product.create({
            name,
            slug: slugify(name),
            sku: sku.toUpperCase(),
            description,
            price,
            compareAtPrice,
            images: images || [],
            category,
            brand,
            tags: tags || [],
            eventTags: eventTags || [],
            stock: stock || 0,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create product",
        });
    }
};

export const getProducts = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            search,
            category,
            brand,
            minPrice,
            maxPrice,
            inStock,
            minRating,
            status,
            sort = "newest",
            page = "1",
            limit = "12",
        } = req.query;

        const currentPage = Math.max(
            Number(page),
            1
        );

        const itemsPerPage = Math.min(
            Math.max(Number(limit), 1),
            250
        );

        const skip =
            (currentPage - 1) * itemsPerPage;

        const filter: Record<string, any> = {};

        if (status && status !== "all") {
            filter.status = status;
        } else if (!status) {
            filter.status = "active";
        }

        if (search) {
            filter.$text = {
                $search: String(search),
            };
        }

        if (category) {
            const categoryDoc = await Category.findOne({
                slug: String(category),
            });

            if (!categoryDoc) {
                return res.status(200).json({
                    success: true,
                    products: [],
                    pagination: {
                        page: currentPage,
                        limit: itemsPerPage,
                        total: 0,
                        pages: 0,
                    },
                });
            }

            filter.category = categoryDoc._id;
        }

        if (brand) {
            filter.brand = { $regex: new RegExp(`^${String(brand).trim()}$`, "i") };
        }

        if (inStock === "true") {
            filter.stock = { $gt: 0 };
        }

        if (minRating !== undefined && !isNaN(Number(minRating))) {
            filter.rating = { $gte: Number(minRating) };
        }

        if (
            minPrice !== undefined ||
            maxPrice !== undefined
        ) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        let sortOption: Record<string, 1 | -1> = {
            createdAt: -1,
        };

        if (sort === "price-low") {
            sortOption = {
                price: 1,
            };
        }

        if (sort === "price-high") {
            sortOption = {
                price: -1,
            };
        }

        if (sort === "rating") {
            sortOption = {
                rating: -1,
            };
        }

        if (sort === "oldest") {
            sortOption = {
                createdAt: 1,
            };
        }

        const [products, total] =
            await Promise.all([
                Product.find(filter)
                    .populate(
                        "category",
                        "name slug"
                    )
                    .sort(sortOption)
                    .skip(skip)
                    .limit(itemsPerPage),

                Product.countDocuments(filter),
            ]);

        return res.status(200).json({
            success: true,
            products,

            pagination: {
                page: currentPage,
                limit: itemsPerPage,
                total,
                pages: Math.ceil(
                    total / itemsPerPage
                ),
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
};

export const getProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const product = await Product.findOne({
            slug: req.params.slug,
            status: "active",
        }).populate(
            "category",
            "name slug"
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch product",
        });
    }
};

export const updateProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const product =
            await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const fields = [
            "name",
            "description",
            "price",
            "compareAtPrice",
            "images",
            "category",
            "brand",
            "tags",
            "eventTags",
            "stock",
            "status",
        ];

        for (const field of fields) {
            if (req.body[field] !== undefined) {
                (product as any)[field] =
                    req.body[field];
            }
        }

        if (req.body.name) {
            product.slug = slugify(
                req.body.name
            );
        }

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update product",
        });
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const product =
            await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.status = "inactive";

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product removed successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove product",
        });
    }
};