import { IncomeSource } from "../../domain/entities/income_source";
import { OneTimeExpense } from "../../domain/entities/one_time_expense";
import { OneTimeExpenseInterface } from "../../domain/interfaces/one_time_expense.interface";
import { Usecase } from "../usecase";

export type CreateOneTimeExpenseInputDto = {
    description: string;
    amount: number;
    date: Date;
    note: string;
    categoryId: string;
    userId: string;
};

export type CreateOneTimeExpenseOutputDto = {
    id: string;
};

export class CreateOneTimeExpenseUsecase implements Usecase<
    CreateOneTimeExpenseInputDto,
    CreateOneTimeExpenseOutputDto
> {
    private constructor(
        private readonly oneTimeExpenseRepository: OneTimeExpenseInterface,
    ) {}

    public static build(oneTimeExpenseRepository: OneTimeExpenseInterface) {
        return new CreateOneTimeExpenseUsecase(oneTimeExpenseRepository);
    }
    public async execute(
        input: CreateOneTimeExpenseInputDto,
    ): Promise<CreateOneTimeExpenseOutputDto> {
        const aOneTimeExpense = OneTimeExpense.build(input);

        await this.oneTimeExpenseRepository.create(aOneTimeExpense);
        const output: CreateOneTimeExpenseOutputDto = {
            id: aOneTimeExpense.id,
        };

        return output;
    }
}
