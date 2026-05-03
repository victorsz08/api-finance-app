import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";

export class AuthLogoutRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build() {
        const middlewares: Array<Middleware> = [new AuthMiddleware()];

        return new AuthLogoutRoute("/logout", HttpMethod.POST, middlewares);
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const user = req.user;

            if (!user) {
                return res.status(400).send({ message: "Usuário não está logado" });
            }

            res.clearCookie("fn.accesstoken");
            res.clearCookie("fn.refreshtoken");

            return res.status(200).send({ message: "Logout feito com sucesso" });
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getMiddlewares(): Array<Middleware> {
        return this.middlewares;
    }
}
