import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { DeleteOneTimeExpenseUsecase } from "../../../../../usecase/one_time_expense/delete";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { FindOneTimeExpenseDto } from "../../../../dtos/one_time_expense.dto";

export class DeleteOneTimeExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteOneTimeExpenseService: DeleteOneTimeExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(deleteOneTimeExpenseService: DeleteOneTimeExpenseUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(FindOneTimeExpenseDto, "params"),
        ];

        return new DeleteOneTimeExpenseRoute(
            "/one_time_expense/:id",
            HttpMethod.DELETE,
            deleteOneTimeExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = FindOneTimeExpenseDto.parse(req.params);

            await this.deleteOneTimeExpenseService.execute(params);
            return res
                .status(200)
                .send({ message: "Gasto pontual excluído com sucesso!" });
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
