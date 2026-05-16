import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { UpdateIncomeSourceUsecase } from "../../../../../usecase/income_source/update";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import {
    findIncomeSourceDto,
    updateIncomeSourceDto,
} from "../../../../dtos/income_source.dto";

export class UpdateIncomeSourceRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateIncomeSourceService: UpdateIncomeSourceUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(updateIncomeSourceService: UpdateIncomeSourceUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(findIncomeSourceDto, "params"),
            new Validate(updateIncomeSourceDto),
        ];

        return new UpdateIncomeSourceRoute(
            "/income_source/:id",
            HttpMethod.PUT,
            updateIncomeSourceService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const { id } = findIncomeSourceDto.parse(req.params);
            const body = updateIncomeSourceDto.parse(req.body);

            const response = await this.updateIncomeSourceService.execute({
                id,
                ...body,
            });

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
