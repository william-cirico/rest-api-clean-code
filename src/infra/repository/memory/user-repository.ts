import { User } from "../../../entity/user/user";
import { IUserRepository } from "../../../usecases/repository/user-repository";

export class UserMemoryRepository implements IUserRepository {
    private db: User[];
    static counter = 0;

    public constructor(db: any) {
        this.db = db;
    }

    getUsers(): Promise<User[]> {
        return new Promise((resolve) => resolve(this.db));
    }

    getUserById(id: number): Promise<User | undefined> {
        return new Promise((resolve) => {
            const user = this.db.find((user: User) => user.id === id);
            resolve(user);
        });
    }

    insertUser(user: User): Promise<User> {
        return new Promise((resolve) => {
            UserMemoryRepository.counter++;
            user.id = UserMemoryRepository.counter;
            this.db.push(user);
            
            resolve(user)
        });
    }

    updateUser(updatedUser: User): Promise<User> {
        return new Promise(resolve => {
            const index = this.db.map((user: User) => user.id).indexOf(updatedUser.id);

            if (index !== -1) {
                this.db[index] = updatedUser;
            }

            resolve(this.db[index]);
        });
    }

    deleteUser(user: User): Promise<void> {
        return new Promise(resolve => {
            const index = this.db.map((user: User) => user.id).indexOf(user.id);

            if (index !== -1) {
                this.db.splice(index, 1);
            }

            resolve();
        });
    }
}