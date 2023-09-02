import { DomainError } from "../../error/domain-error";

export class InvalidPhoneError extends Error implements DomainError {
    constructor(phone: string) {
        super(`O telefone ${phone} é inválido`);
        this.name = "InvalidPhoneError";
    }
}