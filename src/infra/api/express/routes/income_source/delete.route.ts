import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { DeleteIncomeSourceUsecase } from "../../../../../usecase/income_source/delete";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findIncomeSourceDto } from "../../../../dtos/income_source.dto";

export class DeleteIncomeSourceRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteIncomeSourceService: DeleteIncomeSourceUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(deleteIncomeSourceService: DeleteIncomeSourceUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(findIncomeSourceDto, "params"),
        ];

        return new DeleteIncomeSourceRoute(
            "/income_source/:id",
            HttpMethod.DELETE,
            deleteIncomeSourceService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = findIncomeSourceDto.parse(req.params);

            await this.deleteIncomeSourceService.execute(params);
            return res
                .status(200)
                .send({ message: "Fonte de renda deletada com sucesso!" });
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
