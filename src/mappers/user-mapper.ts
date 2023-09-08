import { RegisterUserInput, UserOutput } from "../adapters/handler/ports/user";
import { User } from "../entity/user/user";
import { User as TypeORMUser } from "../infra/database/typeorm/entity/user";

export class UserMapper {
    static fromTypeORMToDomain(typeORMUser: TypeORMUser): User {
        const domainUser = new User(typeORMUser.name, typeORMUser.email, typeORMUser.password, typeORMUser.cpf, typeORMUser.phone);
        domainUser.id = typeORMUser.id;
        return domainUser;
    }

    static fromDomainToTypeORM(domainUser: User): TypeORMUser {
        return {
            id: domainUser.id,
            name: domainUser.name,
            cpf: domainUser.cpf,
            email: domainUser.cpf,
            password: domainUser.password,
            phone: domainUser.phone
        }
    }

    static fromTypeORMToDomains(typeORMUsers: TypeORMUser[]): User[] {
        return typeORMUsers.map(typeORMUser => this.fromTypeORMToDomain(typeORMUser));
    }

    static fromDomainToTypeORMS(domainUsers: User[]): TypeORMUser[] {
        return domainUsers.map(domainUser => this.fromDomainToTypeORM(domainUser));
    }

    static fromDomainToDTO(domainUser: User): UserOutput {
        return {
            id: domainUser.id,
            cpf: domainUser.cpf,
            name: domainUser.name,
            email: domainUser.email,
            phone: domainUser.phone,
        }
    }

    static fromDomainToDTOS(domainUsers: User[]): UserOutput[] {
        return domainUsers.map(domainUser => this.fromDomainToDTO(domainUser));
    }

    static fromRegisterDTOToDomain(dtoUser: RegisterUserInput): User {
        return new User(dtoUser.name, dtoUser.email, dtoUser.password, dtoUser.cpf, dtoUser.phone);
    }
}