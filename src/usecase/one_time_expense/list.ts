import { OneTimeExpense } from "../../domain/entities/one_time_expense";
import { OneTimeExpenseInterface } from "../../domain/interfaces/one_time_expense.interface";
import { Usecase } from "../usecase";

export type ListOneTimeExpenseInputDto = {
    userId: string;
    categoryId?: string;
    month?: { year: number; month: number };
    amountRange?: { min: number; max: number };
    pagination?: { page: number; pageSize: number };
};

export type ListOneTimeExpenseOutputDto = {
    data: Array<{
        id: string;
        description: string;
        amount: number;
        date: Date;
        note: string;
        categoryId: string;
    }>;
    total: number;
};

export class ListOneTimeExpenseUsecase implements Usecase<
    ListOneTimeExpenseInputDto,
    ListOneTimeExpenseOutputDto
> {
    private constructor(
        private readonly oneTimeExpenseRepository: OneTimeExpenseInterface,
    ) {}

    public static build(oneTimeExpenseRepository: OneTimeExpenseInterface) {
        return new ListOneTimeExpenseUsecase(oneTimeExpenseRepository);
    }

    public async execute(
        input: ListOneTimeExpenseInputDto,
    ): Promise<ListOneTimeExpenseOutputDto> {
        const aOneTimeExpenses = await this.oneTimeExpenseRepository.list(input);

        const output = this.present(aOneTimeExpenses);
        return output;
    }

    private present(output: {
        data: Array<OneTimeExpense>;
        total: number;
    }): ListOneTimeExpenseOutputDto {
        return {
            data: output.data.map((one) => ({
                id: one.id,
                description: one.description,
                amount: one.amount,
                date: one.date,
                note: one.note,
                categoryId: one.categoryId,
            })),
            total: output.total,
        };
    }
}
