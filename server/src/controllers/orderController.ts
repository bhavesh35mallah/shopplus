import { Request, Response } from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

// Helper to seed realistic orders if none exist
const seedInitialOrdersIfEmpty = async () => {
  const existingCount = await Order.countDocuments();
  if (existingCount > 0) return;

  const sampleProducts = await Product.find({ status: "active" }).limit(10);
  if (sampleProducts.length === 0) return;

  const initialSeedOrders = [
    {
      orderNumber: "SP-92410-MUM",
      customerName: "Aarav Sharma",
      customerEmail: "aarav.sharma@example.com",
      destination: "Flat 802, Windsor Grande, Link Road, Andheri West, Mumbai (400053)",
      city: "Mumbai",
      items: [
        {
          productId: sampleProducts[0]._id,
          name: sampleProducts[0].name,
          image: sampleProducts[0].images?.[0] || "",
          price: sampleProducts[0].price,
          qty: 1,
        },
        sampleProducts[1]
          ? {
              productId: sampleProducts[1]._id,
              name: sampleProducts[1].name,
              image: sampleProducts[1].images?.[0] || "",
              price: sampleProducts[1].price,
              qty: 2,
            }
          : null,
      ].filter(Boolean),
      itemsCount: sampleProducts[1] ? 3 : 1,
      total: sampleProducts[0].price + (sampleProducts[1] ? sampleProducts[1].price * 2 : 0),
      status: "processing",
      paymentMethod: "UPI / PhonePe",
      carrier: "BlueDart Express",
      trackingNumber: "BLUEDART-88210-EXP",
    },
    {
      orderNumber: "SP-88340-DEL",
      customerName: "Rohit Dhawan",
      customerEmail: "rohit.dhawan@example.com",
      destination: "B-42, Vasant Vihar, Poorvi Marg, New Delhi (110057)",
      city: "New Delhi",
      items: sampleProducts[2]
        ? [
            {
              productId: sampleProducts[2]._id,
              name: sampleProducts[2].name,
              image: sampleProducts[2].images?.[0] || "",
              price: sampleProducts[2].price,
              qty: 1,
            },
          ]
        : [],
      itemsCount: 1,
      total: sampleProducts[2] ? sampleProducts[2].price : 2499,
      status: "delivered",
      paymentMethod: "Razorpay / Cards",
      carrier: "Delhivery Air",
      trackingNumber: "DELHIVERY-99214-DOM",
    },
    {
      orderNumber: "SP-87120-BLR",
      customerName: "Karthik Nair",
      customerEmail: "karthik.nair@example.com",
      destination: "Villa 14, Palm Meadows, Whitefield, Bengaluru (560066)",
      city: "Bengaluru",
      items: sampleProducts[3]
        ? [
            {
              productId: sampleProducts[3]._id,
              name: sampleProducts[3].name,
              image: sampleProducts[3].images?.[0] || "",
              price: sampleProducts[3].price,
              qty: 1,
            },
          ]
        : [],
      itemsCount: 1,
      total: sampleProducts[3] ? sampleProducts[3].price : 1899,
      status: "shipped",
      paymentMethod: "Netbanking (HDFC)",
      carrier: "BlueDart Express",
      trackingNumber: "BLUEDART-77192-EXP",
    },
  ];

  await Order.insertMany(initialSeedOrders);
};

// GET all orders
export const getOrders = async (_req: Request, res: Response) => {
  try {
    await seedInitialOrdersIfEmpty();
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error: any) {
    console.error("getOrders error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};

// POST create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerEmail,
      destination,
      items,
      total,
      paymentMethod,
      city,
    } = req.body;

    if (!customerName || !items || items.length === 0 || !total) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields",
      });
    }

    const orderNumber = `SP-${Math.floor(1000 + Math.random() * 9000)}-${(city || "IND")
      .slice(0, 3)
      .toUpperCase()}`;

    const itemsCount = items.reduce((s: number, i: any) => s + (i.qty || 1), 0);

    const newOrder = await Order.create({
      orderNumber,
      customerName,
      customerEmail: customerEmail || "guest@shoppulse.com",
      destination: destination || city || "India",
      city: city || "Mumbai",
      items,
      itemsCount,
      total,
      status: "processing",
      paymentMethod: paymentMethod || "UPI",
      trackingNumber: `BLUEDART-${Math.floor(100000 + Math.random() * 900000)}-EXP`,
      carrier: "BlueDart Express",
    });

    // Decrement stock for matched products
    for (const item of items) {
      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -(item.qty || 1) },
        }).catch(() => null);
      }
    }

    return res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (error: any) {
    console.error("createOrder error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};

// PATCH update status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order: updated,
    });
  } catch (error: any) {
    console.error("updateOrderStatus error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update order status",
    });
  }
};

// GET Dashboard Live Analytics calculated dynamically from DB
export const getDashboardAnalytics = async (_req: Request, res: Response) => {
  try {
    await seedInitialOrdersIfEmpty();

    // 1. Orders and Revenue
    const orders = await Order.find().sort({ createdAt: -1 });
    const totalOrders = orders.length;
    const grossRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter(
      (o) => o.status === "pending" || o.status === "processing"
    ).length;
    const shippedOrders = orders.filter((o) => o.status === "shipped").length;
    const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

    // 2. Products and Live Inventory
    const products = await Product.find().populate("category", "name slug");
    const totalSKUs = products.length;
    const totalInventoryUnits = products.reduce(
      (sum, p) => sum + (p.stock || 0),
      0
    );
    const totalInventoryValuation = products.reduce(
      (sum, p) => sum + (p.price || 0) * (p.stock || 0),
      0
    );
    const lowStockCount = products.filter(
      (p) => (p.stock ?? 0) <= 5 && (p.stock ?? 0) > 0
    ).length;
    const outOfStockCount = products.filter((p) => (p.stock ?? 0) === 0).length;

    // 3. Category Breakdown dynamically from real catalog
    const categories = await Category.find();
    const categoryBreakdown = categories.map((cat) => {
      const catProducts = products.filter(
        (p: any) =>
          p.category?._id?.toString() === cat._id.toString() ||
          p.category?.slug === cat.slug ||
          p.category?.name === cat.name
      );
      const catStock = catProducts.reduce((s, p) => s + (p.stock || 0), 0);
      const catValue = catProducts.reduce(
        (s, p) => s + (p.price || 0) * (p.stock || 0),
        0
      );

      return {
        category: cat.name,
        slug: cat.slug,
        productCount: catProducts.length,
        stockUnits: catStock,
        valuation: catValue,
        sales: catProducts.reduce((s, p) => s + ((p as any).sales || 0), 0),
      };
    });

    // 4. Monthly Revenue Trend dynamically
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap: Record<string, { month: string; revenue: number; orders: number }> = {};

    // Initialize recent months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${monthNames[d.getMonth()]}`;
      monthlyMap[key] = { month: key, revenue: 0, orders: 0 };
    }

    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      const key = monthNames[d.getMonth()];
      if (monthlyMap[key]) {
        monthlyMap[key].revenue += o.total || 0;
        monthlyMap[key].orders += 1;
      }
    });

    const monthlyRevenue = Object.values(monthlyMap);

    // 5. Users count
    const users = await User.find();
    const totalUsers = users.length;
    const vendorsCount = users.filter((u) => u.role === "vendor").length;
    const customersCount = users.filter((u) => u.role === "customer").length;

    return res.status(200).json({
      success: true,
      analytics: {
        grossRevenue,
        totalOrders,
        pendingOrders,
        shippedOrders,
        deliveredOrders,
        totalSKUs,
        totalInventoryUnits,
        totalInventoryValuation,
        lowStockCount,
        outOfStockCount,
        categoryBreakdown,
        monthlyRevenue,
        totalUsers,
        vendorsCount,
        customersCount,
      },
    });
  } catch (error: any) {
    console.error("getDashboardAnalytics error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to compile dynamic analytics",
    });
  }
};
