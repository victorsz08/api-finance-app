import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { DeleteCategoryUsecase } from "../../../../../usecase/category/delete";
import { Validate } from "../../../../../middleware/validate-middleware";
import { findCategoryDto } from "../../../../dtos/category.dto";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";

export class DeleteCategoryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteCategoryService: DeleteCategoryUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(deleteCategoryService: DeleteCategoryUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(findCategoryDto, "params"),
        ];

        return new DeleteCategoryRoute(
            "/categories/:id",
            HttpMethod.DELETE,
            deleteCategoryService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const params = findCategoryDto.parse(req.params);

            await this.deleteCategoryService.execute(params);
            return res.status(200).send({ message: "Categoria deletada com sucesso!" });
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
