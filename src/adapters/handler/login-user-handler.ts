import { ILoginUser } from "../../usecases/login-user/login-user";
import { MissingParamError } from "./error/missing-param-error";
import { Handler } from "./handler";
import { badRequest, notAuthorized, ok, serverError } from "./helpers/http-helper";
import { HTTPRequest } from "./ports/http";

export class LoginUserHandler implements Handler {
    private readonly loginUser: ILoginUser;

    constructor(loginUser: ILoginUser) {
        this.loginUser = loginUser;
    }

    async handle(req: HTTPRequest) {
        try {
            // Validando os dados do body da requisição
            const fieldsToCheck = ["username", "password"];
            const missingFields: string[] = [];

            fieldsToCheck.forEach(field => {
                if (!req.body[field]) {
                    missingFields.push(field);
                }
            });

            if (missingFields.length > 0) {
                return badRequest(new MissingParamError(missingFields.join(", ")))
            }

            // Utilizando o usecase para criar um usuário
            const { username, password } = req.body;
            
            const token = await this.loginUser.exec({ username, password });

            return ok(token);
        } catch (error: any) {
            switch (error.name) {
                case "InvalidCredentialsError":
                    return notAuthorized(error.message);
                default:
                    return serverError(error.message);
            }
        }
    }
}