import axiosInstance from "./axios";

export interface ApiOrderItem {
  productId?: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

export interface ApiOrder {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  destination: string;
  city: string;
  items: ApiOrderItem[];
  itemsCount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  carrier?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardAnalytics {
  grossRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  totalSKUs: number;
  totalInventoryUnits: number;
  totalInventoryValuation: number;
  lowStockCount: number;
  outOfStockCount: number;
  categoryBreakdown: {
    category: string;
    slug: string;
    productCount: number;
    stockUnits: number;
    valuation: number;
    sales: number;
  }[];
  monthlyRevenue: {
    month: string;
    revenue: number;
    orders: number;
  }[];
  totalUsers: number;
  vendorsCount: number;
  customersCount: number;
}

export const getOrders = async (): Promise<{ success: boolean; count: number; orders: ApiOrder[] }> => {
  const response = await axiosInstance.get("/orders");
  return response.data;
};

export const createOrder = async (orderData: Partial<ApiOrder>): Promise<{ success: boolean; order: ApiOrder }> => {
  const response = await axiosInstance.post("/orders", orderData);
  return response.data;
};

export const updateOrderStatus = async (
  id: string,
  status: ApiOrder["status"]
): Promise<{ success: boolean; order: ApiOrder }> => {
  const response = await axiosInstance.patch(`/orders/${id}/status`, { status });
  return response.data;
};

export const getDashboardAnalytics = async (): Promise<{
  success: boolean;
  analytics: DashboardAnalytics;
}> => {
  const response = await axiosInstance.get("/orders/analytics/dashboard");
  return response.data;
};
