import { FixedExpense } from "../../domain/entities/fixed_expense";
import { FixedExpenseInterface } from "../../domain/interfaces/fixed_expense.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type FindFixedExpenseInputDto = {
    id: string;
};

export type FindFixedExpenseOutputDto = {
    id: string;
    name: string;
    amount: number;
    dueDay: number;
    startDate: Date;
    isActive: boolean;
    categoryId: string;
};

export class FindFixedExpenseUsecase implements Usecase<
    FindFixedExpenseInputDto,
    FindFixedExpenseOutputDto
> {
    private constructor(private readonly fixedExpenseRepository: FixedExpenseInterface) {}

    public static build(fixedExpenseRepository: FixedExpenseInterface) {
        return new FindFixedExpenseUsecase(fixedExpenseRepository);
    }

    public async execute(
        input: FindFixedExpenseInputDto,
    ): Promise<FindFixedExpenseOutputDto> {
        const fixedExpense = await this.fixedExpenseRepository.find(input.id);
        if (!fixedExpense)
            throw new HttpException(404, "Despesa fixa não encontrada com esse ID");

        const output = this.present(fixedExpense);
        return output;
    }

    private present(fixedExpense: FixedExpense): FindFixedExpenseOutputDto {
        return {
            id: fixedExpense.id,
            name: fixedExpense.name,
            amount: fixedExpense.amount,
            dueDay: fixedExpense.dueDay,
            startDate: fixedExpense.startDate,
            isActive: fixedExpense.isActive,
            categoryId: fixedExpense.categoryId,
        };
    }
}
