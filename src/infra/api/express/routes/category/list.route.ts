import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { ListCategoryUsecase } from "../../../../../usecase/category/list";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";

export class ListCategoryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listCategoryService: ListCategoryUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(listCategoryService: ListCategoryUsecase) {
        const middlewares: Array<Middleware> = [new AuthMiddleware()];

        return new ListCategoryRoute(
            "/categories",
            HttpMethod.GET,
            listCategoryService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const userId = req.user.id;

            const response = await this.listCategoryService.execute({ userId });
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
