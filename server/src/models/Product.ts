import mongoose, {
    Document,
    Schema,
} from "mongoose";

export interface IProduct extends Document {
    name: string;
    slug: string;
    sku: string;
    description: string;

    price: number;
    compareAtPrice?: number;

    images: string[];

    category: mongoose.Types.ObjectId;
    brand?: string;

    tags: string[];
    eventTags: string[];

    stock: number;

    rating: number;
    reviewsCount: number;

    status: "active" | "inactive";

    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        compareAtPrice: {
            type: Number,
            min: 0,
        },

        images: [
            {
                type: String,
            },
        ],

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        brand: {
            type: String,
            trim: true,
        },

        tags: [
            {
                type: String,
                lowercase: true,
                trim: true,
            },
        ],

        eventTags: [
            {
                type: String,
                lowercase: true,
                trim: true,
            },
        ],

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },

        reviewsCount: {
            type: Number,
            min: 0,
            default: 0,
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

productSchema.index({
    name: "text",
    description: "text",
    brand: "text",
    tags: "text",
    eventTags: "text",
});

productSchema.index({
    category: 1,
    status: 1,
});

productSchema.index({
    price: 1,
});

productSchema.index({
    createdAt: -1,
});

const Product = mongoose.model<IProduct>(
    "Product",
    productSchema
);

export default Product;