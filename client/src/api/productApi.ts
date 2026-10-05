import api from "./axios";

export interface Category {
    _id: string;
    name: string;
    slug: string;
}

export interface Product {
    _id: string;
    name: string;
    slug: string;
    sku: string;
    description: string;

    price: number;
    compareAtPrice?: number;

    images: string[];

    category: Category;

    brand?: string;

    tags: string[];
    eventTags: string[];

    stock: number;

    rating: number;
    reviewsCount: number;

    status: "active" | "inactive";
}

export interface ProductResponse {
    success: boolean;
    products: Product[];

    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface ProductFilters {
    search?: string;
    category?: string;
    brand?: string;
    inStock?: boolean | string;
    minRating?: number;
    minPrice?: number;
    maxPrice?: number;

    sort?: string;
    status?: string;

    page?: number;
    limit?: number;
}

export const getProducts = async (
    filters: ProductFilters = {}
) => {
    const response =
        await api.get<ProductResponse>(
            "/products",
            {
                params: filters,
            }
        );

    return response.data;
};

export const getProduct = async (
    slug: string
) => {
    const response = await api.get<{
        success: boolean;
        product: Product;
    }>(`/products/${slug}`);

    return response.data.product;
};