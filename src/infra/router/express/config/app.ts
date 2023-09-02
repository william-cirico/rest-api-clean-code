import express from "express";
import { setupAfterRequestMiddlewares, setupBeforeRequestMiddlewares } from "./middleware";
import { setupRoutes } from "./routes";

const app = express();

setupBeforeRequestMiddlewares(app);
setupRoutes(app);
setupAfterRequestMiddlewares(app);

export default app;