import { Express, json } from "express";
import morgan from "morgan";
import cors from "cors";
import { errorHandlerMiddleware } from "../middlewares/error-middleware";

export function setupBeforeRequestMiddlewares(app: Express) {
    app.use(json());
    app.use(morgan("dev"));
    app.use(cors({
        origin: "*",
        allowedHeaders: "*",
        methods: "*"
    }));
}

export function setupAfterRequestMiddlewares(app: Express) {
    app.use(errorHandlerMiddleware);
}