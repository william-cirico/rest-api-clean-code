import jwt from "jsonwebtoken";

const TOKEN_JWT_SECRET = process.env.TOKEN_JWT_SECRET || "";

export function decodeJWTToken(token: string) {
    try {
        return jwt.verify(token, TOKEN_JWT_SECRET);
    } catch (error: any) {
        throw new Error("falha ao decodificar o token: " + error.message);
    }
}