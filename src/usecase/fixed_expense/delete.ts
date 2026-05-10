import { FixedExpenseInterface } from "../../domain/interfaces/fixed_expense.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type DeleteFixedExpenseInputDto = {
    id: string;
};

export type DeleteFixedExpenseOutputDto = void;

export class DeleteFixedExpenseUsecase implements Usecase<
    DeleteFixedExpenseInputDto,
    DeleteFixedExpenseOutputDto
> {
    private constructor(private readonly fixedExpenseRepository: FixedExpenseInterface) {}

    public static build(fixedExpenseRepository: FixedExpenseInterface) {
        return new DeleteFixedExpenseUsecase(fixedExpenseRepository);
    }

    public async execute(input: DeleteFixedExpenseInputDto): Promise<void> {
        const aFixedExpense = await this.fixedExpenseRepository.find(input.id);
        if (!aFixedExpense)
            throw new HttpException(404, "Despesa fixa não localizada com esse ID");

        await this.fixedExpenseRepository.delete(input.id);
        return;
    }
}
