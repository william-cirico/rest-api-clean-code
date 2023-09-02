export interface HTTPRequest {
    params: any;
    status: number;
    body: any;
}

export interface HTTPResponse {
    status: number;
    body?: any;
}