import { IUserRepository } from "../repository/user-repository";
import { RegisterUserInput } from "./input/register-user-input";
import { UserOutput } from "../output-ports/user-output";
import { User } from "../../entity/user/user";

export interface IRegisterUser {
    exec: (user: RegisterUserInput) => Promise<UserOutput>
}

export class RegisterUser implements IRegisterUser {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async exec(user: RegisterUserInput): Promise<UserOutput> {
        const newUser = new User(user.name, user.email, user.password, user.cpf, user.phone);
        const createdUser = await this.userRepository.insertUser(newUser);
        const output: UserOutput = {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            phone: createdUser.phone,
            cpf: createdUser.cpf
        }

        return output;
    }
}