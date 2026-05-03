import { Request, Response, NextFunction } from "express";
import { Middleware } from "./middleware";
import { ZodType } from "zod";

export type SourceValidation = "params" | "query" | "body";

export class Validate implements Middleware {
    public constructor(
        private readonly schema: ZodType,
        private readonly source: SourceValidation = "body",
    ) {
        this.handle = this.handle.bind(this);
    }

    public async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const result = this.schema.safeParse(req[this.source]);
            if (!result.success) {
                const messages = result.error.issues.map((err) => ({
                    path: err.path[0],
                    message: err.message,
                }));

                return res.status(400).send({ message: messages });
            }

            req[this.source] = result.data;

            return next();
        } catch {
            return res.status(500).send({ message: "server error zod validation" });
        }
    }
}
