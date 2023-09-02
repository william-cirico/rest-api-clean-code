import { Request, Response } from "express";
import { Handler } from "../../../../adapters/handler/handler";
import { HTTPRequest, HTTPResponse } from "../../../../adapters/handler/ports/http";

export const expressAdapter = (handler: Handler) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HTTPRequest = {
            status: req.statusCode!,
            body: req.body,
            params: req.params
        };

        const httpResponse: HTTPResponse = await handler.handle(httpRequest);
        res.status(httpResponse.status).json(httpResponse.body);
    }
}