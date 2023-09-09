import { User } from "../../entity/user/user";

export interface IUserRepository {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByUsernameAndPassword(username: string, password: string): Promise<User | undefined>;
    insertUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(user: User): void;
}