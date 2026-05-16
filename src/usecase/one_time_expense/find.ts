import { OneTimeExpense } from "../../domain/entities/one_time_expense";
import { OneTimeExpenseInterface } from "../../domain/interfaces/one_time_expense.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type FindOneTimeExpenseInputDto = {
    id: string;
};

export type FindOneTimeExpenseOutputDto = {
    id: string;
    description: string;
    amount: number;
    date: Date;
    note: string;
    categoryId: string;
};

export class FindOneTimeExpenseUsecase implements Usecase<
    FindOneTimeExpenseInputDto,
    FindOneTimeExpenseOutputDto
> {
    private constructor(
        private readonly oneTimeExpenseRepository: OneTimeExpenseInterface,
    ) {}

    public static build(oneTimeExpenseRepository: OneTimeExpenseInterface) {
        return new FindOneTimeExpenseUsecase(oneTimeExpenseRepository);
    }

    public async execute(
        input: FindOneTimeExpenseInputDto,
    ): Promise<FindOneTimeExpenseOutputDto> {
        const aOneTimeExpense = await this.oneTimeExpenseRepository.find(input.id);

        if (!aOneTimeExpense)
            throw new HttpException(404, "Gasto pontual não localizado com esse ID");

        const output = this.present(aOneTimeExpense);
        return output;
    }

    private present(oneTimeExpense: OneTimeExpense): FindOneTimeExpenseOutputDto {
        return {
            id: oneTimeExpense.id,
            description: oneTimeExpense.description,
            amount: oneTimeExpense.amount,
            date: oneTimeExpense.date,
            note: oneTimeExpense.note,
            categoryId: oneTimeExpense.categoryId,
        };
    }
}
