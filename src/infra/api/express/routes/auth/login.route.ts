import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { AuthLoginUsecase } from "../../../../../usecase/auth/login";
import { Validate } from "../../../../../middleware/validate-middleware";
import { authLoginDto } from "../../../../dtos/login.dto";

export class AuthLoginRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authLoginService: AuthLoginUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(authLoginService: AuthLoginUsecase) {
        const middlewares: Array<Middleware> = [new Validate(authLoginDto)];

        return new AuthLoginRoute(
            "/login",
            HttpMethod.POST,
            authLoginService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const body = authLoginDto.parse(req.body);

            const response = await this.authLoginService.execute(body);

            res.cookie("fn.accesstoken", response.acessToken, {
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

            return res.status(200).send({ message: "Logon realizado com sucesso!" });
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
