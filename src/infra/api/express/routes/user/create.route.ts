import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { CreateUserUsecase } from "../../../../../usecase/user/create";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { createUserDto } from "../../../../dtos/user.dto";

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(createUserService: CreateUserUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(createUserDto),
        ];

        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const body = createUserDto.parse(req.body);

            const response = await this.createUserService.execute(body);
            return res.status(201).send(response);
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
