import { Router } from "express";
import { expressAdapter } from "../adapters/express-handler-adpater";
import { makeRegisterUserHandlerFactory } from "../../../factories/register-user-handler-factory";
import { makeGetUsersHandlerFactory } from "../../../factories/get-users-handler-factory";
import { authMiddleware } from "../middlewares/auth-middleware";
import { makeUpdateUserHandlerFactory } from "../../../factories/update-user-handle-factory";

export function register(router: Router) {
    router.get("/v1/users", authMiddleware, expressAdapter(makeGetUsersHandlerFactory()));
    router.post("/v1/users", expressAdapter(makeRegisterUserHandlerFactory()));
    router.put("/v1/users/:id", expressAdapter(makeUpdateUserHandlerFactory()));
}