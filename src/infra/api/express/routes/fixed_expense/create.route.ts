import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { CreateFixedExpenseUsecase } from "../../../../../usecase/fixed_expense/create";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { createFixedExpenseDto } from "../../../../dtos/fixed_expense.dto";

export class CreateFixedExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createFixedExpenseService: CreateFixedExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(createFixedExpenseService: CreateFixedExpenseUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(createFixedExpenseDto),
        ];

        return new CreateFixedExpenseRoute(
            "/fixed_expense",
            HttpMethod.POST,
            createFixedExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const userId = req.user.id;
            const body = createFixedExpenseDto.parse(req.body);

            const response = await this.createFixedExpenseService.execute({
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
