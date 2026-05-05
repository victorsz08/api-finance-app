import { Request, Response } from "express";
import { Middleware } from "../../../../../middleware/middleware";
import { HttpMethod, Route } from "../route";
import { CreateCategoryUsecase } from "../../../../../usecase/category/create";
import { AuthMiddleware } from "../../../../../middleware/auth-middleware";
import { Validate } from "../../../../../middleware/validate-middleware";
import { createCategoryDto } from "../../../../dtos/category.dto";

export class CreateCategoryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createCategoryService: CreateCategoryUsecase,
        private readonly middlewares: Array<Middleware>,
    ) {}

    public static build(createCategoryService: CreateCategoryUsecase) {
        const middlewares: Array<Middleware> = [
            new AuthMiddleware(),
            new Validate(createCategoryDto),
        ];

        return new CreateCategoryRoute(
            "/categories",
            HttpMethod.POST,
            createCategoryService,
            middlewares,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<Response> {
        return async (req: Request, res: Response) => {
            const userId = req.user.id;
            const body = createCategoryDto.parse(req.body);

            const response = await this.createCategoryService.execute({
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
