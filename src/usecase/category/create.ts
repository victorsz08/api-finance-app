import { Category, CategoryType } from "../../domain/entities/categories";
import { CategoryInterface } from "../../domain/interfaces/category.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type CreateCategoryInputDto = {
    name: string;
    type: CategoryType;
    color: string;
    userId: string;
};

export type CreateCategoryOutputDto = {
    id: string;
};

export class CreateCategoryUsecase implements Usecase<
    CreateCategoryInputDto,
    CreateCategoryOutputDto
> {
    private constructor(private readonly categoryRepository: CategoryInterface) {}

    public static build(categoryRepository: CategoryInterface) {
        return new CreateCategoryUsecase(categoryRepository);
    }

    public async execute(
        input: CreateCategoryInputDto,
    ): Promise<CreateCategoryOutputDto> {
        const nameCategoryAlreadyExists = await this.categoryRepository.findByName(
            input.name,
        );

        if (nameCategoryAlreadyExists)
            throw new HttpException(400, "Você já possui uma categoria com este nome");

        const aCategory = Category.build(input);

        await this.categoryRepository.create(aCategory);
        const output: CreateCategoryOutputDto = {
            id: aCategory.id,
        };

        return output;
    }
}
