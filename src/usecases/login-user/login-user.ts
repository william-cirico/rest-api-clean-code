import { generateTokenJWT } from "../../infra/auth/jwt-generator";
import { IUserRepository } from "../repository/user-repository";
import { InvalidCredentialsError } from "./error/login-user-error";
import { AuthInput } from "./input/login-user-input";

export interface ILoginUser {
    exec: (auth: AuthInput) => Promise<string>
}

export class LoginUser implements ILoginUser {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async exec(auth: AuthInput): Promise<string> {
        const user = await this.userRepository.getUserByUsernameAndPassword(auth.username, auth.password);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const token = generateTokenJWT({ sub: user.id });

        return token;
    }
}