export class ServerError extends Error {
    constructor(reason: string) {
        super(`Erro interno do servidor: ${reason}`);
        this.name = "ServerError";
    }
}