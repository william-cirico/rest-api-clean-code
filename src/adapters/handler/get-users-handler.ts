import { Handler } from "./handler";
import { IGetUsers } from "../../usecases/get-users";
import { ok, serverError } from "./helpers/http-helper";
import { HTTPRequest } from "./ports/http";
import { UserMapper } from "../../mappers/user-mapper";

export class GetUsersHandler implements Handler {
    private readonly getUsers: IGetUsers;

    constructor(getUsers: IGetUsers) {
        this.getUsers = getUsers;
    }

    async handle(req: HTTPRequest) {
        try {
           const users = await this.getUsers.exec();
           return ok(UserMapper.fromDomainToDTOS(users));
        } catch (error: any) {
            return serverError(error);
        }
    }
}