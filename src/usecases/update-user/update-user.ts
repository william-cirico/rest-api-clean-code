import { User } from "../../entity/user/user";
import { NotFoundUserError } from "../error/not-found-user-error";
import { IUserRepository } from "../repository/user-repository";
import { UpdateUserInput } from "./input/update-user-input";

export interface IUpdateUser {
    exec: (updateData: UpdateUserInput, id: number) => Promise<User>
}

export class UpdateUser implements IUpdateUser {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async exec(updateData: UpdateUserInput, id: number): Promise<User> {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundUserError(id);
        }

        // Atualizando os dados do usuário
        user.name = updateData.name;
        user.password = updateData.password;
        user.email = updateData.email;
        user.phone = updateData.phone;

        const updatedUser = this.userRepository.updateUser(user);

        return updatedUser;
    }
}