import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { CreateIncomeSourceUsecase } from "../../../../../usecase/income_source/create";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { createIncomeSourceDto } from "../../../../dtos/income_source.dto";

export class CreateIncomeSourceRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createIncomeSourceService: CreateIncomeSourceUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(createIncomeSourceService: CreateIncomeSourceUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(createIncomeSourceDto),
        ];

        return new CreateIncomeSourceRoute(
            "/income_source",
            HttpMethod.POST,
            createIncomeSourceService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const body = createIncomeSourceDto.parse(req.body);
            const userId = req.user.id;

            const response = await this.createIncomeSourceService.execute({
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
