import { UserOutput } from "../output-ports/user-output";
import { IUserRepository } from "../repository/user-repository";

export interface IGetUsers {
    exec: () => Promise<UserOutput[]>
}

export class GetUsers implements IGetUsers {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async exec(): Promise<UserOutput[]> {
        const users = await this.userRepository.getUsers();

        const output: UserOutput[] = users.map(user => ({
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            phone: user.phone
        }));

        return output;
    }
}