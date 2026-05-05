import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { UpdateCategoryUsecase } from "../../../../../usecase/category/update";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findCategoryDto, updateCategoryDto } from "../../../../dtos/category.dto";

export class UpdateCategoryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateCategoryService: UpdateCategoryUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(updateCategoryService: UpdateCategoryUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(updateCategoryDto),
            new Validate(findCategoryDto, "params"),
        ];

        return new UpdateCategoryRoute(
            "/categories/:id",
            HttpMethod.PUT,
            updateCategoryService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const body = updateCategoryDto.parse(req.body);
            const { id } = findCategoryDto.parse(req.params);

            const response = await this.updateCategoryService.execute({ ...body, id });

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
