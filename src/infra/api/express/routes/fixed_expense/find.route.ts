import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { FindFixedExpenseUsecase } from "../../../../../usecase/fixed_expense/find";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findFixedExpenseDto } from "../../../../dtos/fixed_expense.dto";

export class FindFixedExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findFixedExpenseService: FindFixedExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(findFixedExpenseService: FindFixedExpenseUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(findFixedExpenseDto, "params"),
        ];

        return new FindFixedExpenseRoute(
            "/fixed_expense/:id",
            HttpMethod.GET,
            findFixedExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = findFixedExpenseDto.parse(req.params);

            const response = await this.findFixedExpenseService.execute(params);
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
