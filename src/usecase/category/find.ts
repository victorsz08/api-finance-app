import { Category, CategoryType } from "../../domain/entities/categories";
import { CategoryInterface } from "../../domain/interfaces/category.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type FindCategoryInputDto = {
    id: string;
};

export type FindCategoryOutputDto = {
    id: string;
    name: string;
    type: CategoryType;
    color: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindCategoryUsecase implements Usecase<
    FindCategoryInputDto,
    FindCategoryOutputDto
> {
    private constructor(private readonly categoryRepository: CategoryInterface) {}

    public static build(categoryRepository: CategoryInterface) {
        return new FindCategoryUsecase(categoryRepository);
    }

    public async execute(input: FindCategoryInputDto): Promise<FindCategoryOutputDto> {
        const { id } = input;

        const category = await this.categoryRepository.find(id);
        if (!category)
            throw new HttpException(404, "Categoria não localizada com esse ID");

        const output = this.present(category);

        return output;
    }

    private present(category: Category): FindCategoryOutputDto {
        return {
            id: category.id,
            name: category.name,
            type: category.type,
            color: category.color,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    }
}
