import axiosInstance from "./axios";

export interface ApiUser {
  _id: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role: "customer" | "admin" | "vendor";
  isActive?: boolean;
  phone?: string;
  avatar?: string;
  createdAt: string;
  ordersPlaced?: number;
  totalSpend?: number;
}

export const getUsers = async (): Promise<{ success: boolean; count: number; users: ApiUser[] }> => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const updateUserRole = async (
  id: string,
  role: "customer" | "admin" | "vendor"
): Promise<{ success: boolean; user: ApiUser }> => {
  const response = await axiosInstance.patch(`/users/${id}/role`, { role });
  return response.data;
};

export const updateUserStatus = async (
  id: string,
  isActive: boolean
): Promise<{ success: boolean; user: ApiUser }> => {
  const response = await axiosInstance.patch(`/users/${id}/status`, { isActive });
  return response.data;
};
