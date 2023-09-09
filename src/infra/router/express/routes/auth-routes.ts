import { Router } from "express";
import { expressAdapter } from "../adapters/express-handler-adpater";
import { makeLoginUserHandlerFactory } from "../../../factories/login-user-handler-factory";

export function register(router: Router) {
    router.post("/v1/login", expressAdapter(makeLoginUserHandlerFactory()));
}