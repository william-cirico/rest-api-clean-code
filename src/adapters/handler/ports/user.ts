export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
}

export interface UserOutput {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
}