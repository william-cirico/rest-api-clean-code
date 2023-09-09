import { UserMapper } from "../../mapper/user-mapper";
import { RegisterUserInput } from "../../usecases/register-user/input/register-user-input";
import { IUpdateUser } from "../../usecases/update-user/update-user";
import { MissingParamError } from "./error/missing-param-error";
import { Handler } from "./handler";
import { badRequest, forbidden, notFound, ok, serverError } from "./helpers/http-helper";
import { HTTPRequest, HTTPResponse } from "./ports/http";

export class UpdateUserHandler implements Handler {
    private readonly updateUser: IUpdateUser;

    constructor(updateUser: IUpdateUser) {
        this.updateUser = updateUser;
    }

    async handle(req: HTTPRequest) {
        try {
            // Validando os dados do body da requisição
            const fieldsToCheck = ["id", "name", "email", "password", "phone"];
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
            const { id, name, email, password, phone } = req.body;

            const updatedUser = await this.updateUser.exec({ id, name, email, password, phone }, id);

            // Formatar os dados -> Domain --> DTO
            return ok(UserMapper.fromDomainToDTO(updatedUser));
        } catch (error: any) {
            switch (error.name) {
                case "InvalidPasswordError":
                    return badRequest(error);
                case "InvalidPhoneError":
                    return badRequest(error);
                case "NotFoundUserError":
                    return notFound(error);
                default:
                    return serverError(error.message);
            }
        }
    }
}