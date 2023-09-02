import { ServerError } from "../error/server-error";
import { HTTPResponse } from "../ports/http";

export function badRequest(error: Error): HTTPResponse {
    return {
        body: { error: error.message },
        status: 400
    };
}

export function ok(data: any): HTTPResponse {
    return {
        body: data,
        status: 200
    };
}

export function created(data: any): HTTPResponse {
    return {
        body: data,
        status: 201
    };
}

export function noContent(): HTTPResponse {
    return {
        status: 204
    };
}

export function serverError(reason: string): HTTPResponse {
    return {
        body: new ServerError(reason),
        status: 500
    };
}
