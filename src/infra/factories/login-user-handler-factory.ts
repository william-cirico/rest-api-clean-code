import { LoginUserHandler } from "../../adapters/handler/login-user-handler";
import { LoginUser } from "../../usecases/login-user/login-user";
import { UserTypeORMRepository } from "../repository/user-typeorm-repository";

export function makeLoginUserHandlerFactory(): LoginUserHandler {
    const userTypeORMRepository = new UserTypeORMRepository();
    const loginUserUseCase = new LoginUser(userTypeORMRepository);
    const loginUserHandler = new LoginUserHandler(loginUserUseCase);

    return loginUserHandler;
}