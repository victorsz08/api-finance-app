import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { AuthRefreshUsecase } from "../../../../../usecase/auth/refresh";

export class AuthRefreshRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authRefreshService: AuthRefreshUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(authRefreshService: AuthRefreshUsecase) {
        return new AuthRefreshRoute("/refresh", HttpMethod.POST, authRefreshService, []);
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const refreshToken = req.cookies["fn.refreshtoken"];

            if (!refreshToken) {
                return res.status(400).send({ message: "Não autorizado" });
            }

            const user = req.user;
            const response = await this.authRefreshService.execute(user);

            res.cookie("fn.accesstoken", response.accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 15, // 15min
                sameSite: "none",
            });
            res.cookie("fn.refreshtoken", response.refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
                sameSite: "none",
            });

            return res.status(200).send({ message: "OK!" });
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
