import { RegisterUserHandler } from "../../adapters/handler/register-user-handler";
import { RegisterUser } from "../../usecases/register-user/register-user";
import { UserTypeORMRepository } from "../repository/user-typeorm-repository";

export function makeRegisterUserHandlerFactory(): RegisterUserHandler {
    const userTypeORMRepository = new UserTypeORMRepository();
    const registerUserUseCase = new RegisterUser(userTypeORMRepository);
    const registerUserHandler = new RegisterUserHandler(registerUserUseCase);

    return registerUserHandler;
}