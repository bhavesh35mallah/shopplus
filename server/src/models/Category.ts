import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: mongoose.Types.ObjectId | null;
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        image: {
            type: String,
        },

        parentId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

categorySchema.index({
    name: "text",
    description: "text",
});

const Category = mongoose.model<ICategory>(
    "Category",
    categorySchema
);

export default Category;