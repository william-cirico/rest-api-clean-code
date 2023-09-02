import { User } from "../../entity/user/user";

export interface IUserRepository {
    getUsers(): Promise<User[]>;
    getUserById(id: number): User | undefined;
    insertUser(user: User): Promise<User>;
    updateUser(user: User): void;
    deleteUser(user: User): void;
}