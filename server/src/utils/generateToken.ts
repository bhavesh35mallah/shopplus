import jwt from "jsonwebtoken";

interface TokenPayload {
    userId: string;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not defined");
    }

    return jwt.sign(payload, secret, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    const secret = process.env.JWT_REFRESH_SECRET;

    if (!secret) {
        throw new Error("JWT_REFRESH_SECRET is not defined");
    }

    return jwt.sign(payload, secret, {
        expiresIn: "7d",
    });
};