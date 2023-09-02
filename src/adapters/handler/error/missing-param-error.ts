export class MissingParamError extends Error {
    constructor(paramName: string) {
        super(`Parâmetro(s) faltando: ${paramName}`);
        this.name = "MissingParamError";
    }
}