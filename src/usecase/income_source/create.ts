import { IncomeSource, RecurrenceType } from "../../domain/entities/income_source";
import { IncomeSourceInterface } from "../../domain/interfaces/income_source.interface";
import { Usecase } from "../usecase";

export type CreateIncomeSourceInputDto = {
    name: string;
    amount: number;
    recurrence: RecurrenceType;
    startDate: Date;
    endDate: Date;
    userId: string;
    categoryId: string;
};

export type CreateIncomeSourceOutputDto = {
    id: string;
};

export class CreateIncomeSourceUsecase implements Usecase<
    CreateIncomeSourceInputDto,
    CreateIncomeSourceOutputDto
> {
    private constructor(private readonly incomeSourceRepository: IncomeSourceInterface) {}

    public static build(incomeSourceRepository: IncomeSourceInterface) {
        return new CreateIncomeSourceUsecase(incomeSourceRepository);
    }

    public async execute(
        input: CreateIncomeSourceInputDto,
    ): Promise<CreateIncomeSourceOutputDto> {
        const aIncomeSource = IncomeSource.build(input);

        await this.incomeSourceRepository.create(aIncomeSource);

        const output: CreateIncomeSourceOutputDto = {
            id: aIncomeSource.id,
        };

        return output;
    }
}
