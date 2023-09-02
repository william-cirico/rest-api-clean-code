import { User } from "../../entity/user/user";
import { IUserRepository } from "../../usecases/repository/user-repository";

export class UserMemoryRepository implements IUserRepository {
    private db: User[];

    public constructor(db: any) {
        this.db = db;
    }

    getUsers(): Promise<User[]> {
        return new Promise((resolve) => resolve(this.db));
    }

    getUserById(id: number) {
        return this.db.find((user: User) => user.id === id);
    }

    insertUser(user: User): Promise<User> {
        this.db.push(user);
        return new Promise((resolve) => resolve(user));
    }

    updateUser(updatedUser: User) {
        const index = this.db.map((user: User) => user.id).indexOf(updatedUser.id);

        if (index !== -1) {
            this.db[index] = updatedUser;
        }
    }

    deleteUser(user: User) {
        const index = this.db.map((user: User) => user.id).indexOf(user.id);

        if (index !== -1) {
            this.db.splice(index, 1);
        }
    }
}