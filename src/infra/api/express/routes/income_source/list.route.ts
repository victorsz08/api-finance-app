import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import {
    ListIncomeSourceInputDto,
    ListIncomeSourceUsecase,
} from "../../../../../usecase/income_source/list";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { listIncomeSourceDto } from "../../../../dtos/income_source.dto";

export class ListIncomeSourceRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listIncomeSourceService: ListIncomeSourceUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(listIncomeSourceService: ListIncomeSourceUsecase) {
        const middlewares: Array<Middleware> = [new AuthMiddleware()];

        return new ListIncomeSourceRoute(
            "/income_source",
            HttpMethod.GET,
            listIncomeSourceService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const query = listIncomeSourceDto.parse(req.query);
            const userId = req.user.id;

            const filters: ListIncomeSourceInputDto = {
                userId,
                categoryId: query.categoryId,
                pagination: { page: query.page, pageSize: query.pageSize },
                isActive:
                    query.isActive === "true"
                        ? true
                        : query.isActive === "false"
                          ? false
                          : undefined,
                recurrence: query.recurrence,
            };

            if (query.month) {
                const parts = query.month.split("-");
                const month = Number(parts[1]);
                const year = Number(parts[0]);

                if (!isNaN(month) && !isNaN(year)) {
                    filters.month = { month, year };
                }
            }

            const response = await this.listIncomeSourceService.execute(filters);
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
