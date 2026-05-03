import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { UpdateUserUsecase } from "../../../../../usecase/user/update";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findUserDto, updateUserDto } from "../../../../dtos/user.dto";

export class UpdateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserService: UpdateUserUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(updateUserService: UpdateUserUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(updateUserDto),
        ];

        return new UpdateUserRoute(
            "/users/:id",
            HttpMethod.PUT,
            updateUserService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const body = updateUserDto.parse(updateUserDto);
            const { id } = findUserDto.parse(req.params);

            const response = await this.updateUserService.execute({ id, ...body });
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
