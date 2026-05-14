import { IncomeSourceInterface } from "../../domain/interfaces/income_source.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type DeleteIncomeSourceInputDto = {
    id: string;
};

export type DeleteIncomeSourceOutputDto = void;

export class DeleteIncomeSourceUsecase implements Usecase<
    DeleteIncomeSourceInputDto,
    DeleteIncomeSourceOutputDto
> {
    private constructor(private readonly incomeSourceRepository: IncomeSourceInterface) {}

    public static build(incomeSourceRepository: IncomeSourceInterface) {
        return new DeleteIncomeSourceUsecase(incomeSourceRepository);
    }

    public async execute(input: DeleteIncomeSourceInputDto): Promise<void> {
        const aIncomeSource = await this.incomeSourceRepository.find(input.id);

        if (!aIncomeSource)
            throw new HttpException(404, "Fonte de renda não localizada com esse ID");

        await this.incomeSourceRepository.delete(input.id);
        return;
    }
}
