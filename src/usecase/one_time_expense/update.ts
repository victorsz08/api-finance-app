import { OneTimeExpenseInterface } from "../../domain/interfaces/one_time_expense.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type UpdateOneTimeExpenseInputDto = {
    id: string;
    description: string;
    amount: number;
    date: Date;
    note: string;
    categoryId: string;
};

export type UpdateOneTimeExpenseOutputDto = {
    id: string;
};

export class UpdateOneTimeExpenseUsecase implements Usecase<
    UpdateOneTimeExpenseInputDto,
    UpdateOneTimeExpenseOutputDto
> {
    private constructor(
        private readonly oneTimeExpenseRepository: OneTimeExpenseInterface,
    ) {}

    public static build(oneTimeExpenseRepository: OneTimeExpenseInterface) {
        return new UpdateOneTimeExpenseUsecase(oneTimeExpenseRepository);
    }

    public async execute(
        input: UpdateOneTimeExpenseInputDto,
    ): Promise<UpdateOneTimeExpenseOutputDto> {
        const aOneTimeExpense = await this.oneTimeExpenseRepository.find(input.id);

        if (!aOneTimeExpense)
            throw new HttpException(404, "Gasto pontual não localizado com esse ID");

        await this.oneTimeExpenseRepository.update(input);
        const output: UpdateOneTimeExpenseOutputDto = {
            id: aOneTimeExpense.id,
        };

        return output;
    }
}
