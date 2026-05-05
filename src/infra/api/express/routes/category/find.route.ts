import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { FindCategoryUsecase } from "../../../../../usecase/category/find";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { validate } from "uuid";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findCategoryDto } from "../../../../dtos/category.dto";

export class FindCategoryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findCategoryService: FindCategoryUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(findCategoryService: FindCategoryUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(findCategoryDto, "params"),
        ];

        return new FindCategoryRoute(
            "/categories/:id",
            HttpMethod.GET,
            findCategoryService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = findCategoryDto.parse(req.params);

            const response = await this.findCategoryService.execute(params);
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
