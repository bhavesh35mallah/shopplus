import api from "./axios";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: "customer" | "admin" | "vendor";
    avatar?: string;
}

interface AuthResponse {
    success: boolean;
    message: string;
    user: User;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const registerUser = async (
    data: RegisterData
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        "/auth/register",
        data
    );

    return response.data;
};

export const loginUser = async (
    data: LoginData
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        "/auth/login",
        data
    );

    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<{
        success: boolean;
        user: User;
    }>("/auth/me");

    return response.data.user;
};