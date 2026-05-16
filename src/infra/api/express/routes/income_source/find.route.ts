import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { FindIncomeSourceUsecase } from "../../../../../usecase/income_source/find";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findIncomeSourceDto } from "../../../../dtos/income_source.dto";

export class FindIncomeSourceRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findIncomeSourceService: FindIncomeSourceUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(findIncomeSourceService: FindIncomeSourceUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(findIncomeSourceDto, "params"),
        ];

        return new FindIncomeSourceRoute(
            "/income_source/:id",
            HttpMethod.GET,
            findIncomeSourceService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = findIncomeSourceDto.parse(req.params);

            const response = await this.findIncomeSourceService.execute(params);
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
