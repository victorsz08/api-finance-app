import { NextFunction, Request, Response } from "express";
import { HttpException } from "./http-exception";

export function handleErrors() {
    return async (
        error: Error & Partial<HttpException>,
        _req: Request,
        res: Response,
        _next: NextFunction,
    ) => {
        const statusCode = error.statusCode ?? 500;
        const message = error.message ?? "Erro interno do servidor";

        return res.status(statusCode).send({ message: message });
    };
}
