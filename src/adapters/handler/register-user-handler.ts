import { UserMapper } from "../../mappers/user-mapper";
import { IRegisterUser } from "../../usecases/register-user";
import { MissingParamError } from "./error/missing-param-error";
import { Handler } from "./handler";
import { badRequest, ok, serverError } from "./helpers/http-helper";
import { HTTPRequest } from "./ports/http";
import { RegisterUserInput } from "./ports/user";

export class RegisterUserHandler implements Handler {
    private readonly registerUser: IRegisterUser;

    constructor(registerUser: IRegisterUser) {
        this.registerUser = registerUser;
    }

    async handle(req: HTTPRequest) {
        try {
            // Validando os dados do body da requisição
            const fieldsToCheck = ["name", "email", "password", "cpf", "phone"];
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
            const { name, email, password, cpf, phone } = req.body;
            const registerUserInput: RegisterUserInput = { name, email, password, cpf, phone };

            const registerUserOutput = await this.registerUser.exec(UserMapper.fromRegisterDTOToDomain(registerUserInput));

            return ok(UserMapper.fromDomainToDTO(registerUserOutput));
        } catch (error: any) {
            switch (error.name) {
                case "InvalidPasswordError":
                    return badRequest(error);
                case "InvalidCPFError":
                    return badRequest(error);
                case "InvalidPhoneError":
                    return badRequest(error);
                default:
                    return serverError(error);
            }
        }
    }
}