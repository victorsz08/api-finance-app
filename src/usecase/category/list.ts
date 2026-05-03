import { Category, CategoryType } from "../../domain/entities/categories";
import { CategoryInterface } from "../../domain/interfaces/category.interface";
import { Usecase } from "../usecase";

export type ListCategoryInputDto = {
    userId: string;
};

export type ListCategoryOutputDto = {
    categories: Array<{
        id: string;
        name: string;
        type: CategoryType;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    total: number;
};

export class ListCategoryUsecase implements Usecase<
    ListCategoryInputDto,
    ListCategoryOutputDto
> {
    private constructor(private readonly categoryRepository: CategoryInterface) {}

    public static build(categoryRepository: CategoryInterface) {
        return new ListCategoryUsecase(categoryRepository);
    }

    public async execute(input: ListCategoryInputDto): Promise<ListCategoryOutputDto> {
        const { userId } = input;

        const categories = await this.categoryRepository.list(userId);
        const output = this.present(categories);

        return output;
    }

    private present(categories: Array<Category>): ListCategoryOutputDto {
        return {
            categories: categories.map((category) => ({
                id: category.id,
                name: category.name,
                type: category.type,
                color: category.color,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            })),
            total: categories.length,
        };
    }
}
