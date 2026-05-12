import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { DeleteFixedExpenseUsecase } from "../../../../../usecase/fixed_expense/delete";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findFixedExpenseDto } from "../../../../dtos/fixed_expense.dto";

export class DeleteFixedExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteFixedExpenseService: DeleteFixedExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(deleteFixedExpenseService: DeleteFixedExpenseUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(findFixedExpenseDto, "params"),
        ];

        return new DeleteFixedExpenseRoute(
            "/fixed_expense/:id",
            HttpMethod.DELETE,
            deleteFixedExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = findFixedExpenseDto.parse(req.params);

            await this.deleteFixedExpenseService.execute(params);
            return res
                .status(200)
                .send({ message: "Despesa fixa deletada com sucesso!" });
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
