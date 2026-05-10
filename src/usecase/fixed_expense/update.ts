import { FixedExpenseInterface } from "../../domain/interfaces/fixed_expense.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type UpdateFixedExpenseInputDto = {
    id: string;
    name: string;
    amount: number;
    dueDay: number;
    startDate: Date;
    isActive: boolean;
    categoryId: string;
};

export type UpdateFixedExpenseOutputDto = {
    id: string;
};

export class UpdateFixedExpenseUsecase implements Usecase<
    UpdateFixedExpenseInputDto,
    UpdateFixedExpenseOutputDto
> {
    private constructor(private readonly fixedExpenseRepository: FixedExpenseInterface) {}

    public static build(fixedExpenseRepository: FixedExpenseInterface) {
        return new UpdateFixedExpenseUsecase(fixedExpenseRepository);
    }

    public async execute(
        input: UpdateFixedExpenseInputDto,
    ): Promise<UpdateFixedExpenseOutputDto> {
        const aFixedExpense = await this.fixedExpenseRepository.find(input.id);
        if (!aFixedExpense)
            throw new HttpException(404, "Despesa fixa não localizada com esse ID");

        await this.fixedExpenseRepository.update(input);

        const output: UpdateFixedExpenseOutputDto = {
            id: aFixedExpense.id,
        };

        return output;
    }
}
