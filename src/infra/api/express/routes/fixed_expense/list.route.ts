import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import {
    ListFixedExpenseInputDto,
    ListFixedExpenseUsecase,
} from "../../../../../usecase/fixed_expense/list";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { listFixedExpenseDto } from "../../../../dtos/fixed_expense.dto";
import { ListFixedExpenseFilters } from "../../../../../domain/interfaces/fixed_expense.interface";

export class ListFixedExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listFixedExpenseService: ListFixedExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(listFixedExpenseService: ListFixedExpenseUsecase) {
        const middlewares: Array<Middleware> = [new AuthMiddleware()];

        return new ListFixedExpenseRoute(
            "/fixed_expense",
            HttpMethod.GET,
            listFixedExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const userId = req.user.id;
            const { categoryId, isActive, month, page, pageSize } =
                listFixedExpenseDto.parse(req.query);

            const filters: ListFixedExpenseFilters = {
                userId,
                categoryId: (categoryId as string) || undefined,
                isActive:
                    isActive === "true" ? true : isActive === "false" ? false : undefined,
                pagination: page
                    ? {
                          page: Number(page),
                          pageSize: Number(pageSize ?? 20),
                      }
                    : undefined,
            };

            if (month) {
                const parts = month.split("-");

                const year = Number(parts[0]);
                const m = Number(parts[1]);

                filters.month = { year, month: m };
            }

            const response = await this.listFixedExpenseService.execute(filters);
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
