export interface HTTPRequest {
    userId?: any;
    params: any;
    status: number;
    body: any;
}

export interface HTTPResponse {
    locals?: any;
    status: any;
    body?: any;
}