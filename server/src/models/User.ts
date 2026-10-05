import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "customer" | "admin" | "vendor";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    role: UserRole;
    avatar?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        phone: {
            type: String,
            trim: true,
        },

        role: {
            type: String,
            enum: ["customer", "admin", "vendor"],
            default: "customer",
        },

        avatar: {
            type: String,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;