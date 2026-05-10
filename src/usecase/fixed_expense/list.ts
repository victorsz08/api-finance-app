import { FixedExpense } from "../../domain/entities/fixed_expense";
import { FixedExpenseInterface } from "../../domain/interfaces/fixed_expense.interface";
import { Usecase } from "../usecase";

export type ListFixedExpenseInputDto = {
    userId: string;
    categoryId?: string;
    isActive?: boolean;
    dueDayRange?: {
        min: number;
        max: number;
    };
    month?: {
        year: number;
        month: number;
    };
    pagination?: {
        page: number;
        pageSize: number;
    };
};

export type ListFixedExpenseOutputDto = {
    data: Array<{
        id: string;
        name: string;
        amount: number;
        dueDay: number;
        isActive: boolean;
        startDate: Date;
        categoryId: string;
    }>;
    total: number;
};

export class ListFixedExpenseUsecase implements Usecase<
    ListFixedExpenseInputDto,
    ListFixedExpenseOutputDto
> {
    private constructor(private readonly fixedExpenseRepository: FixedExpenseInterface) {}

    public static build(fixedExpenseRepository: FixedExpenseInterface) {
        return new ListFixedExpenseUsecase(fixedExpenseRepository);
    }

    public async execute(
        input: ListFixedExpenseInputDto,
    ): Promise<ListFixedExpenseOutputDto> {
        const data = await this.fixedExpenseRepository.list(input);

        const output = this.present(data);
        return output;
    }

    private present(data: {
        data: Array<FixedExpense>;
        total: number;
    }): ListFixedExpenseOutputDto {
        return {
            data: data.data.map((expense) => ({
                id: expense.id,
                name: expense.name,
                amount: expense.amount,
                dueDay: expense.dueDay,
                startDate: expense.startDate,
                isActive: expense.isActive,
                categoryId: expense.categoryId,
            })),
            total: data.total,
        };
    }
}
