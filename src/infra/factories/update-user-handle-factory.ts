import { UpdateUserHandler } from "../../adapters/handler/update-user-handler";
import { UpdateUser } from "../../usecases/update-user/update-user";
import { UserTypeORMRepository } from "../repository/user-typeorm-repository";

export function makeUpdateUserHandlerFactory(): UpdateUserHandler {
    const userTypeORMRepository = new UserTypeORMRepository();
    const updateUserUseCase = new UpdateUser(userTypeORMRepository);
    const updateUserHandler = new UpdateUserHandler(updateUserUseCase);

    return updateUserHandler;
}