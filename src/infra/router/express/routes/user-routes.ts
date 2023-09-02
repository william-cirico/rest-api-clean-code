import { Router } from "express";
import { expressAdapter } from "../adapters/express-handler-adpater";
import { makeRegisterUserHandlerFactory } from "../../../factories/register-user-handler-factory";
import { makeGetUsersHandlerFactory } from "../../../factories/get-users-handler-factory";

export function register(router: Router) {
    router.get("/v1/users", expressAdapter(makeGetUsersHandlerFactory()));
    router.post("/v1/users", expressAdapter(makeRegisterUserHandlerFactory()));
}