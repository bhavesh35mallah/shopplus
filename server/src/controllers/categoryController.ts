import { Request, Response } from "express";

import Category from "../models/Category.js";
import { slugify } from "../utils/slugify.js";

export const createCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            name,
            description,
            image,
            parentId,
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        const slug = slugify(name);

        const existingCategory = await Category.findOne({
            slug,
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists",
            });
        }

        const category = await Category.create({
            name,
            slug,
            description,
            image,
            parentId: parentId || null,
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create category",
        });
    }
};

export const getCategories = async (
    _req: Request,
    res: Response
) => {
    try {
        const categories = await Category.find({
            status: "active",
        })
            .populate("parentId", "name slug")
            .sort({ name: 1 });

        return res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
        });
    }
};

export const getCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const category = await Category.findOne({
            slug: req.params.slug,
            status: "active",
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch category",
        });
    }
};

export const updateCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, description, image, parentId, status } =
            req.body;

        const category = await Category.findById(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        if (name) {
            category.name = name;
            category.slug = slugify(name);
        }

        if (description !== undefined) {
            category.description = description;
        }

        if (image !== undefined) {
            category.image = image;
        }

        if (parentId !== undefined) {
            category.parentId = parentId || null;
        }

        if (status !== undefined) {
            category.status = status;
        }

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update category",
        });
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const category = await Category.findByIdAndDelete(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete category",
        });
    }
};