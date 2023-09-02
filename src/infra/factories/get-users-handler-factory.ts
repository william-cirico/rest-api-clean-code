import { GetUsersHandler } from "../../adapters/handler/get-users-handler";
import { GetUsers } from "../../usecases/get-users/get-users";
import database from "../database";
import { UserMemoryRepository } from "../repository/user-memory-repository";

export function makeGetUsersHandlerFactory(): GetUsersHandler {
    const userDatabase = database.users;
    const userMemoryRepository = new UserMemoryRepository(userDatabase);
    const getUsersUseCase = new GetUsers(userMemoryRepository);
    const getUsersHandler = new GetUsersHandler(getUsersUseCase);

    return getUsersHandler;
}