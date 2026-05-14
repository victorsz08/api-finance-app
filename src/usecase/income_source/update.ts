import { RecurrenceType } from "../../domain/entities/income_source";
import { IncomeSourceInterface } from "../../domain/interfaces/income_source.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type UpdateIncomeSourceInputDto = {
    id: string;
    name: string;
    amount: number;
    recurrence: RecurrenceType;
    startDate: Date;
    endDate: Date;
    categoryId: string;
    isActive: boolean;
};

export type UpdateIncomeSourceOutputDto = {
    id: string;
};

export class UpdateIncomeSourceUsecase implements Usecase<
    UpdateIncomeSourceInputDto,
    UpdateIncomeSourceOutputDto
> {
    private constructor(private readonly incomeSourceRepository: IncomeSourceInterface) {}

    public static build(incomeSourceRepository: IncomeSourceInterface) {
        return new UpdateIncomeSourceUsecase(incomeSourceRepository);
    }

    public async execute(
        input: UpdateIncomeSourceInputDto,
    ): Promise<UpdateIncomeSourceOutputDto> {
        const aIncomeSource = await this.incomeSourceRepository.find(input.id);

        if (!aIncomeSource)
            throw new HttpException(404, "Fonte de renda não localizada com esse ID");

        await this.incomeSourceRepository.update(input);
        const output: UpdateIncomeSourceOutputDto = {
            id: aIncomeSource.id,
        };

        return output;
    }
}
