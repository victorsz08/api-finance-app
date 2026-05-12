import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { UpdateFixedExpenseUsecase } from "../../../../../usecase/fixed_expense/update";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import {
    findFixedExpenseDto,
    updateFixedExpenseDto,
} from "../../../../dtos/fixed_expense.dto";

export class UpdateFixedExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateFixedExpenseService: UpdateFixedExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(updateFixedExpenseService: UpdateFixedExpenseUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(updateFixedExpenseDto),
        ];

        return new UpdateFixedExpenseRoute(
            "/fixed_expense/:id",
            HttpMethod.PUT,
            updateFixedExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const { id } = findFixedExpenseDto.parse(req.params);
            const body = updateFixedExpenseDto.parse(req.body);

            const response = await this.updateFixedExpenseService.execute({
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
