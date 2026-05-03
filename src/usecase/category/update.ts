import { CategoryType } from "../../domain/entities/categories";
import { CategoryInterface } from "../../domain/interfaces/category.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type UpdateCategoryInputDto = {
    id: string;
    name: string;
    type: CategoryType;
    color: string;
};

export type UpdateCategoryOutputDto = {
    id: string;
};

export class UpdateCategoryUsecase implements Usecase<
    UpdateCategoryInputDto,
    UpdateCategoryOutputDto
> {
    private constructor(private readonly categoryRepository: CategoryInterface) {}

    public static build(categoryRepository: CategoryInterface) {
        return new UpdateCategoryUsecase(categoryRepository);
    }

    public async execute(
        input: UpdateCategoryInputDto,
    ): Promise<UpdateCategoryOutputDto> {
        const { id, name, type, color } = input;

        const category = await this.categoryRepository.find(id);
        if (!category)
            throw new HttpException(404, "Categoria não localizada com esse ID");

        if (category.name !== name) {
            const nameCategoryAlreadyExists =
                await this.categoryRepository.findByName(name);
            if (nameCategoryAlreadyExists)
                throw new HttpException(
                    409,
                    "Você já possui uma categoria com esse nome",
                );
        }

        const updatedAt = new Date();
        await this.categoryRepository.update({
            id,
            name,
            type,
            color,
            updatedAt,
        });

        const output: UpdateCategoryOutputDto = {
            id: category.id,
        };

        return output;
    }
}
