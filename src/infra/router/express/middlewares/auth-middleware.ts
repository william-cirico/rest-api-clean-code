import { NextFunction, Request, Response } from "express";
import { decodeJWTToken } from "../../../auth/jwt-decoder";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    /*
    Bearer Authentication
    
    Cabeçalho: Authentication
    Valor: Bearer auisdhfaisdhfisadhfasdh3147982704127247017834170sdfakdjfhads
    ["Bearer", "auisdhfaisdhfisadhfasdh3147982704127247017834170sdfakdjfhads"]
    */
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token de autenticação é obrigatório." });
    }

    try {
        const payload = decodeJWTToken(token);
        res.locals.id = payload.sub;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido." });
    }
}