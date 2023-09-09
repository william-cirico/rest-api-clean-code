import { Repository } from "typeorm";
import { User } from "../../entity/user/user";
import { User as TypeORMUser } from "../database/typeorm/entity/user";
import { IUserRepository } from "../../usecases/repository/user-repository";
import { AppDataSource } from "../database/typeorm/typeorm-database";
import { UserMapper } from "../../mapper/user-mapper";
import { UpdateUserInput } from "../../usecases/update-user/input/update-user-input";

export class UserTypeORMRepository implements IUserRepository {
    private userRepository: Repository<TypeORMUser>

    public constructor() {
        this.userRepository = AppDataSource.getRepository(TypeORMUser);
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        return UserMapper.fromTypeORMToDomains(users);
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOneByOrFail({ id });
        return UserMapper.fromTypeORMToDomain(user);
    }

    async getUserByUsernameAndPassword(username: string, password: string): Promise<User | undefined> {
        const user = await this.userRepository.findOneBy({ email: username, password });
        return user ? UserMapper.fromTypeORMToDomain(user) : undefined;
    }

    async insertUser(user: User): Promise<User> {
        const createdUser = await this.userRepository.save(UserMapper.fromDomainToTypeORM(user));
        return UserMapper.fromTypeORMToDomain(createdUser);
    }

    async updateUser(user: User): Promise<User> {
        const updatedUser = await this.userRepository.save(UserMapper.fromDomainToTypeORM(user));
        return UserMapper.fromTypeORMToDomain(updatedUser);
    }

    deleteUser(user: User) {
        throw new Error("Not implemented.")
    }
}