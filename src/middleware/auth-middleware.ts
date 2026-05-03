import { Request, Response, NextFunction } from "express";
import { Middleware } from "./middleware";
import { verify } from "jsonwebtoken";
import { JwtPayload } from "../types/jwt-payload";

export class AuthMiddleware implements Middleware {
    public async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        const token = req.cookies["fn.accesstoken"];
        if (!token)
            return res.status(401).send({ message: "Token de acesso não localizado" });

        try {
            const payload = verify(token, String(process.env.AUTH_TOKEN)) as JwtPayload;

            if (payload.type !== "access")
                return res.status(401).send({ message: "Não autorizado" });

            req.user = payload;

            next();
        } catch (error) {
            return res.status(500).send({ message: "Erro interno do servidor" });
        }
    }
}
