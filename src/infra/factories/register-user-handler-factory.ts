import { RegisterUserHandler } from "../../adapters/handler/register-user-handler";
import { RegisterUser } from "../../usecases/register-user/register-user";
import database from "../database";
import { UserMemoryRepository } from "../repository/user-memory-repository";

export function makeRegisterUserHandlerFactory(): RegisterUserHandler {
    const userDatabase = database.users;
    const userMemoryRepository = new UserMemoryRepository(userDatabase);
    const registerUserUseCase = new RegisterUser(userMemoryRepository);
    const registerUserHandler = new RegisterUserHandler(registerUserUseCase);

    return registerUserHandler;
}