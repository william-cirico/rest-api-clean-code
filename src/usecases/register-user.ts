import { User } from "../entity/user/user";
import { IUserRepository } from "./repository/user-repository";

export interface IRegisterUser {
    exec: (user: User) => Promise<User>
}

export class RegisterUser implements IRegisterUser {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async exec(user: User): Promise<User> {
        const newUser = new User(user.name, user.email, user.password, user.cpf, user.phone);
        const createdUser = await this.userRepository.insertUser(newUser);
        return createdUser;
    }
}