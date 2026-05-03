import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { DeleteUserUsecase } from "../../../../../usecase/user/delete";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { findUserDto } from "../../../../dtos/user.dto";

export class DeleteUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteUserService: DeleteUserUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(deleteUserServie: DeleteUserUsecase) {
        const middlewares: Array<Middleware> = [new AuthMiddleware()];

        return new DeleteUserRoute(
            "/user/:id",
            HttpMethod.DELETE,
            deleteUserServie,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = findUserDto.parse(req.params);

            await this.deleteUserService.execute(params);
            return res.status(200).send({ message: "Usuário deletado com sucesso" });
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
