import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  productId?: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  qty: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  user?: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  destination: string;
  items: IOrderItem[];
  itemsCount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  carrier?: string;
  trackingNumber?: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    destination: { type: String, required: true },
    items: [orderItemSchema],
    itemsCount: { type: Number, required: true, default: 1 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    paymentMethod: { type: String, default: "UPI / Netbanking" },
    carrier: { type: String, default: "BlueDart Express" },
    trackingNumber: { type: String },
    city: { type: String, default: "Mumbai" },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
