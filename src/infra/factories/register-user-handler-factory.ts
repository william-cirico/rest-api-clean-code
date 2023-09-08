import { RegisterUserHandler } from "../../adapters/handler/register-user-handler";
import { RegisterUser } from "../../usecases/register-user";
import { UserTypeORMRepository } from "../repository/typeorm/user-repository";

export function makeRegisterUserHandlerFactory(): RegisterUserHandler {
    const userRepository = new UserTypeORMRepository();
    const registerUserUseCase = new RegisterUser(userRepository);
    const registerUserHandler = new RegisterUserHandler(registerUserUseCase);

    return registerUserHandler;
}