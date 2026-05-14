import { IncomeSource, RecurrenceType } from "../../domain/entities/income_source";
import { IncomeSourceInterface } from "../../domain/interfaces/income_source.interface";
import { Usecase } from "../usecase";

export type ListIncomeSourceInputDto = {
    userId: string;
    categoryId?: string;
    recurrence?: RecurrenceType;
    isActive?: boolean;
    month?: { year: number; month: number };
    pagination?: { page: number; pageSize: number };
};

export type ListIncomeSourceOutputDto = {
    data: Array<{
        id: string;
        name: string;
        amount: number;
        recurrency: RecurrenceType;
        isActive: boolean;
        categoryId: string;
        startDate: Date;
        endDate: Date;
    }>;
    total: number;
};

export class ListIncomeSourceUsecase implements Usecase<
    ListIncomeSourceInputDto,
    ListIncomeSourceOutputDto
> {
    private constructor(private readonly incomeSourceRepository: IncomeSourceInterface) {}

    public static build(incomeSourceRepository: IncomeSourceInterface) {
        return new ListIncomeSourceUsecase(incomeSourceRepository);
    }

    public async execute(
        input: ListIncomeSourceInputDto,
    ): Promise<ListIncomeSourceOutputDto> {
        const aIncomeSourceList = await this.incomeSourceRepository.list(input);

        const output = this.present(aIncomeSourceList);
        return output;
    }

    private present(output: {
        data: Array<IncomeSource>;
        total: number;
    }): ListIncomeSourceOutputDto {
        return {
            data: output.data.map((income) => ({
                id: income.id,
                name: income.name,
                amount: income.amount,
                recurrency: income.recurrence,
                isActive: income.isActive,
                startDate: income.startDate,
                endDate: income.endDate,
                categoryId: income.categoryId,
            })),
            total: output.total,
        };
    }
}
