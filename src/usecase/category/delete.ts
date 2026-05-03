import { CategoryInterface } from "../../domain/interfaces/category.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type DeleteCategoryInputDto = {
    id: string;
};

export type DeleteCategoryOutputDto = void;

export class DeleteCategoryUsecase implements Usecase<
    DeleteCategoryInputDto,
    DeleteCategoryOutputDto
> {
    private constructor(private readonly categoryRepository: CategoryInterface) {}

    public static build(categoryRepository: CategoryInterface) {
        return new DeleteCategoryUsecase(categoryRepository);
    }

    public async execute(input: DeleteCategoryInputDto): Promise<void> {
        const { id } = input;

        const category = await this.categoryRepository.find(id);
        if (!category)
            throw new HttpException(404, "Categoria não localizada com esse ID");

        await this.categoryRepository.delete(id);
        return;
    }
}
