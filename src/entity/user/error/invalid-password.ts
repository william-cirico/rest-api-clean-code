import { DomainError } from "../../error/domain-error";

export class InvalidPasswordError extends Error implements DomainError {
    constructor(password: string) {
        super(`A senha ${password} é inválida`);
        this.name = "InvalidPasswordError";
    }
}