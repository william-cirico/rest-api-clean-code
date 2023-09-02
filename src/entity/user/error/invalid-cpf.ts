import { DomainError } from "../../error/domain-error";

export class InvalidCPFError extends Error implements DomainError {
    constructor(cpf: string) {
        super(`O CPF ${cpf} é inválido`);
        this.name = "InvalidCPFError";
    }
}