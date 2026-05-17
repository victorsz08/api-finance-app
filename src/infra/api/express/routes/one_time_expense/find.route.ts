import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { FindOneTimeExpenseUsecase } from "../../../../../usecase/one_time_expense/find";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { FindOneTimeExpenseDto } from "../../../../dtos/one_time_expense.dto";

export class FindOneTimeExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findOneTimeExpenseService: FindOneTimeExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(findOneTimeExpenseService: FindOneTimeExpenseUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(FindOneTimeExpenseDto, "params"),
        ];

        return new FindOneTimeExpenseRoute(
            "/one_time_expense/:id",
            HttpMethod.GET,
            findOneTimeExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = FindOneTimeExpenseDto.parse(req.params);

            const response = await this.findOneTimeExpenseService.execute(params);
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
