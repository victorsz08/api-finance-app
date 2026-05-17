import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { CreateOneTimeExpenseUsecase } from "../../../../../usecase/one_time_expense/create";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { CreateOneTimeExpenseDto } from "../../../../dtos/one_time_expense.dto";

export class CreateOneTimeExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createOneTimeExpenseService: CreateOneTimeExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(createOneTimeExpenseService: CreateOneTimeExpenseUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(CreateOneTimeExpenseDto),
        ];

        return new CreateOneTimeExpenseRoute(
            "/one_time_expense",
            HttpMethod.POST,
            createOneTimeExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const body = CreateOneTimeExpenseDto.parse(req.body);
            const userId = req.user.id;

            const response = await this.createOneTimeExpenseService.execute({
                userId,
                ...body,
            });
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
