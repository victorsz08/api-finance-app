import { FixedExpense } from "../../domain/entities/fixed_expense";
import { FixedExpenseInterface } from "../../domain/interfaces/fixed_expense.interface";
import { Usecase } from "../usecase";

export type CreateFixedExpenseInputDto = {
    name: string;
    amount: number;
    dueDay: number;
    startDate: Date;
    categoryId: string;
    userId: string;
};

export type CreateFixedExpenseOutputDto = {
    id: string;
};

export class CreateFixedExpenseUsecase implements Usecase<
    CreateFixedExpenseInputDto,
    CreateFixedExpenseOutputDto
> {
    private constructor(private readonly fixedExpenseRepository: FixedExpenseInterface) {}

    public static build(fixedExpenseRepository: FixedExpenseInterface) {
        return new CreateFixedExpenseUsecase(fixedExpenseRepository);
    }

    public async execute(
        input: CreateFixedExpenseInputDto,
    ): Promise<CreateFixedExpenseOutputDto> {
        const aFixedExpense = FixedExpense.build(input);

        await this.fixedExpenseRepository.create(aFixedExpense);
        const output: CreateFixedExpenseOutputDto = {
            id: aFixedExpense.id,
        };

        return output;
    }
}
