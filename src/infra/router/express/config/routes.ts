import { Express, Router } from "express";
import { readdirSync } from "node:fs";

export function setupRoutes(app: Express) {
    const router = Router();
    
    // Definindo o prefixo para as rotas
    app.use("/api", router);

    // Adicionando as rotas para o router
    readdirSync(`${__dirname}/../routes`).map(async file => {
        if (!file.includes(".test")) {
            (await import(`../routes/${file}`)).register(router);
        }
    });
}