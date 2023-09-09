export class NotFoundUserError extends Error {
    constructor(id: number) {
        super(`Usuário com o ID ${id} não foi encontrado.`);
        this.name = "NotFoundUserError";
    }
}