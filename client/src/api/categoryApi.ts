import api from "./axios";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: "active" | "inactive";
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<{ success: boolean; categories: Category[] }>(
    "/categories"
  );
  return response.data.categories;
};
