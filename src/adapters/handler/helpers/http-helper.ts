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
        body: { error: reason },
        status: 500
    };
}

export function notAuthorized(message: string): HTTPResponse {
    return {
        body: { error: message },
        status: 401
    };
}

export function forbidden(message: string): HTTPResponse {
    return {
        body: { error: message },
        status: 403
    };
}

export function notFound(error: Error): HTTPResponse {
    return {
        body: { error: error.message },
        status: 404
    }
}
 