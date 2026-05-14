import { IncomeSource, RecurrenceType } from "../../domain/entities/income_source";
import { IncomeSourceInterface } from "../../domain/interfaces/income_source.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type FindIncomeSourceInputDto = {
    id: string;
};

export type FindIncomeSourceOutputDto = {
    id: string;
    name: string;
    amount: number;
    recurrency: RecurrenceType;
    startDate: Date;
    endDate: Date;
    categoryId: string;
    isActive: boolean;
};

export class FindIncomeSourceUsecase implements Usecase<
    FindIncomeSourceInputDto,
    FindIncomeSourceOutputDto
> {
    private constructor(private readonly incomeSourceRepository: IncomeSourceInterface) {}

    public static build(incomeSourceRepository: IncomeSourceInterface) {
        return new FindIncomeSourceUsecase(incomeSourceRepository);
    }

    public async execute(
        input: FindIncomeSourceInputDto,
    ): Promise<FindIncomeSourceOutputDto> {
        const aIncomeSource = await this.incomeSourceRepository.find(input.id);

        if (!aIncomeSource)
            throw new HttpException(404, "Fonte de renda não localizada com esse ID");

        const output = this.present(aIncomeSource);
        return output;
    }

    private present(incomeSource: IncomeSource): FindIncomeSourceOutputDto {
        return {
            id: incomeSource.id,
            name: incomeSource.name,
            amount: incomeSource.amount,
            isActive: incomeSource.isActive,
            recurrency: incomeSource.recurrence,
            categoryId: incomeSource.categoryId,
            endDate: incomeSource.endDate,
            startDate: incomeSource.startDate,
        };
    }
}
