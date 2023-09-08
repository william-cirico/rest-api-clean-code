import { User } from "../entity/user/user";
import { IUserRepository } from "./repository/user-repository";

export interface IGetUsers {
    exec: () => Promise<User[]>
}

export class GetUsers implements IGetUsers {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async exec(): Promise<User[]> {
        const users = await this.userRepository.getUsers();

        return users;
    }
}