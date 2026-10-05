import api from "./axios";

export interface HealthResponse {
    success: boolean;
    message: string;
    timestamp: string;
}

export const checkHealth = async (): Promise<HealthResponse> => {
    const response = await api.get<HealthResponse>("/health");

    return response.data;
};