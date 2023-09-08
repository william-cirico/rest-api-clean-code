import { Repository } from "typeorm";
import { User } from "../../../entity/user/user";
import { IUserRepository } from "../../../usecases/repository/user-repository";
import { AppDataSource } from "../../database/typeorm";
import { User as TypeORMUser } from "../../database/typeorm/entity/user";
import { UserMapper } from "../../../mappers/user-mapper";

export class UserTypeORMRepository implements IUserRepository {
    private userRepository: Repository<TypeORMUser>;
    
    constructor() {
        this.userRepository = AppDataSource.getRepository(TypeORMUser);
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        return UserMapper.fromTypeORMToDomains(users);
    }

    async getUserById(id: number): Promise<User | undefined> {
        const user = await this.userRepository.findOneBy({ id });
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

    async deleteUser(user: User): Promise<void> {
        await this.userRepository.delete(UserMapper.fromDomainToTypeORM(user));
    }
}