import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { UpdateOneTimeExpenseUsecase } from "../../../../../usecase/one_time_expense/update";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import {
    FindOneTimeExpenseDto,
    UpdateOneTimeExpenseDto,
} from "../../../../dtos/one_time_expense.dto";

export class UpdateOneTimeExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateOneTimeExpenseService: UpdateOneTimeExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(updateOneTimeExpenseService: UpdateOneTimeExpenseUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(UpdateOneTimeExpenseDto),
            new Validate(FindOneTimeExpenseDto, "params"),
        ];

        return new UpdateOneTimeExpenseRoute(
            "/one_time_expense/:id",
            HttpMethod.PUT,
            updateOneTimeExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const body = UpdateOneTimeExpenseDto.parse(req.body);
            const { id } = FindOneTimeExpenseDto.parse(req.params);

            const response = await this.updateOneTimeExpenseService.execute({
                id,
                ...body,
            });
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
