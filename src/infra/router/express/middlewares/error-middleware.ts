import { ErrorRequestHandler } from "express";

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.json({ message: err.message });
}