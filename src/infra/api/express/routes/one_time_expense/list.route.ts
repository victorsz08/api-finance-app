import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import {
    ListOneTimeExpenseInputDto,
    ListOneTimeExpenseUsecase,
} from "../../../../../usecase/one_time_expense/list";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { ListOneTimeExpenseDto } from "../../../../dtos/one_time_expense.dto";

export class ListOneTimeExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listOneTimeExpenseService: ListOneTimeExpenseUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(listOneTimeExpenseService: ListOneTimeExpenseUsecase) {
        const middlewares: Array<Middleware> = [new AuthMiddleware()];

        return new ListOneTimeExpenseRoute(
            "/one_time_expense",
            HttpMethod.GET,
            listOneTimeExpenseService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const query = ListOneTimeExpenseDto.parse(req.query);
            const userId = req.user.id;

            const filters: ListOneTimeExpenseInputDto = {
                userId,
                categoryId: query.categoryId,
                pagination: {
                    page: Number(query.page),
                    pageSize: Number(query.pageSize),
                },
                amountRange: {
                    min: Number(query.amountRangeMin),
                    max: Number(query.amountRangeMax),
                },
            };

            if (query.month) {
                const parts = query.month.split("-");

                const month = Number(parts[1]);
                const year = Number(parts[0]);

                if (!isNaN(month) && !isNaN(year)) {
                    filters.month = {
                        month,
                        year,
                    };
                }
            }

            const response = await this.listOneTimeExpenseService.execute(filters);
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
