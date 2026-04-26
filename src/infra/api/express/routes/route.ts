import { Request, Response } from "express";
import { Middleware } from "../../../../middleware/middleware";

export type HttpMethod = "get" | "post" | "put" | "delete";
export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    PUT: "put" as HttpMethod,
    DELETE: "delete" as HttpMethod 
} as const;


export interface Route {
    getHandler(): (req: Request, res: Response) => Promise<Response>;
    getPath(): string;
    getMethod(): HttpMethod;
    getMiddlewares(): Array<Middleware>;
}