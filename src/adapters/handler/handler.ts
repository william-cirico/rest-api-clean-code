import { HTTPRequest, HTTPResponse } from "./ports/http";

export interface Handler {
    handle: (req: HTTPRequest) => Promise<HTTPResponse>;
}