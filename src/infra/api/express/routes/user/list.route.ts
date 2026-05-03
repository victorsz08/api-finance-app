import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { ListUserUsecase } from "../../../../../usecase/user/list";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { listUserDto } from "../../../../dtos/user.dto";

export class ListUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listUserService: ListUserUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(listUserService: ListUserUsecase) {
        const middlewares: Array<Middleware> = [new AuthMiddleware()];

        return new ListUserRoute("/users", HttpMethod.GET, listUserService, middlewares);
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const query = listUserDto.parse(req.query);

            const response = await this.listUserService.execute(query);
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
