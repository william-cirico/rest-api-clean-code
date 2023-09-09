import { GetUsersHandler } from "../../adapters/handler/get-users-handler";
import { GetUsers } from "../../usecases/get-users/get-users";
import { UserTypeORMRepository } from "../repository/user-typeorm-repository";

export function makeGetUsersHandlerFactory(): GetUsersHandler {
    const userTypeORMRepository = new UserTypeORMRepository();
    const getUsersUseCase = new GetUsers(userTypeORMRepository);
    const getUsersHandler = new GetUsersHandler(getUsersUseCase);

    return getUsersHandler;
}