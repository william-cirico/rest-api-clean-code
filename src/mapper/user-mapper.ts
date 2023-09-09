import { User } from "../entity/user/user";
import { User as TypeORMUser } from "../infra/database/typeorm/entity/user";
import { UserOutput } from "../usecases/output-ports/user-output";

export class UserMapper {
    static fromDomainToTypeORM(domainUser: User): TypeORMUser {
        return {
            id: domainUser.id,
            cpf: domainUser.cpf,
            email: domainUser.email,
            name: domainUser.name,
            password: domainUser.password,
            phone: domainUser.phone
        };
    }

    static fromTypeORMToDomain(typeORMUser: TypeORMUser): User {
        const user = new User(typeORMUser.name, typeORMUser.email, typeORMUser.password, typeORMUser.cpf, typeORMUser.phone);
        user.id = typeORMUser.id;
        return user;
    }

    static fromDomainToTypeORMS(domainUsers: User[]): TypeORMUser[] {
        return domainUsers.map(domainUser => this.fromDomainToTypeORM(domainUser));
    }

    static fromTypeORMToDomains(typeORMUsers: TypeORMUser[]): User[] {
        return typeORMUsers.map(typeORMUser => this.fromTypeORMToDomain(typeORMUser));
    }

    static fromDomainToDTO(domainUser: User): UserOutput {
        return {
            id: domainUser.id,
            cpf: domainUser.cpf,
            email: domainUser.email,
            name: domainUser.name,
            phone: domainUser.phone
        }
    }

    static fromDomainToDTOS(domainUsers: User[]): UserOutput[] {
        return domainUsers.map(domainUser => this.fromDomainToDTO(domainUser));
    }
}