import jwt from "jsonwebtoken";

const TOKEN_JWT_SECRET = process.env.TOKEN_JWT_SECRET || "";

export function generateTokenJWT(payload: any, expiresIn: string = "5h") {
    return jwt.sign(payload, TOKEN_JWT_SECRET, { expiresIn });
}