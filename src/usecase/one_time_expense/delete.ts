import { OneTimeExpenseInterface } from "../../domain/interfaces/one_time_expense.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type DeleteOneTimeExpenseInputDto = {
    id: string;
};

export type DeleteOneTimeExpenseOutputDto = void;

export class DeleteOneTimeExpenseUsecase implements Usecase<
    DeleteOneTimeExpenseInputDto,
    DeleteOneTimeExpenseOutputDto
> {
    private constructor(
        private readonly oneTimeExpenseRepository: OneTimeExpenseInterface,
    ) {}

    public static build(oneTimeExpenseRepository: OneTimeExpenseInterface) {
        return new DeleteOneTimeExpenseUsecase(oneTimeExpenseRepository);
    }

    public async execute(input: DeleteOneTimeExpenseInputDto): Promise<void> {
        const aOneTimeExpense = await this.oneTimeExpenseRepository.find(input.id);

        if (!aOneTimeExpense)
            throw new HttpException(404, "Gasto pontual não localizado com esse ID");

        await this.oneTimeExpenseRepository.delete(input.id);
        return;
    }
}
