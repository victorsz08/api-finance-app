import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { UpdatePasswordUserUsecase } from "../../../../../usecase/user/update-password";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findUserDto, updatePasswordDto } from "../../../../dtos/user.dto";

export class UpdateUserPasswordRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserPasswordService: UpdatePasswordUserUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(updateUserPasswordService: UpdatePasswordUserUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(updatePasswordDto),
        ];

        return new UpdateUserPasswordRoute(
            "/users/update-password/:id",
            HttpMethod.PUT,
            updateUserPasswordService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const body = updatePasswordDto.parse(req.body);
            const { id } = findUserDto.parse(req.params);

            const response = await this.updateUserPasswordService.execute({
                id,
                ...body,
            });
            return res.status(200).send(response);
        };
    }

    getPath(): string {
        throw new Error("Method not implemented.");
    }
    getMethod(): HttpMethod {
        throw new Error("Method not implemented.");
    }
    getMiddlewares(): Array<Middleware> {
        throw new Error("Method not implemented.");
    }
}
