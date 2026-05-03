import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { FindUserUsecase } from "../../../../../usecase/user/find";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { findUserDto } from "../../../../dtos/user.dto";

export class FindUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findUserService: FindUserUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(findUserService: FindUserUsecase) {
        const middlewares: Array<Middleware> = [new AuthMiddleware()];

        return new FindUserRoute(
            "/user/:id",
            HttpMethod.GET,
            findUserService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = findUserDto.parse(req.params);

            const response = await this.findUserService.execute(params);
            return res.status(200).send(response);
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
