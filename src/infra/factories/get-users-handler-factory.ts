import { GetUsersHandler } from "../../adapters/handler/get-users-handler";
import { GetUsers } from "../../usecases/get-users";
import { UserTypeORMRepository } from "../repository/typeorm/user-repository";

export function makeGetUsersHandlerFactory(): GetUsersHandler {
    const userRepository = new UserTypeORMRepository();
    const getUsersUseCase = new GetUsers(userRepository);
    const getUsersHandler = new GetUsersHandler(getUsersUseCase);

    return getUsersHandler;
}