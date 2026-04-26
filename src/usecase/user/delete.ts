import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type DeleteUserInputDto = {
    id: string;
};

export type DeleteUserOutputDto = void;

export class DeleteUserUsecase implements Usecase<
    DeleteUserInputDto,
    DeleteUserOutputDto
> {
    private constructor(private readonly userRepository: UserInterface) {}

    public static build(userRepository: UserInterface) {
        return new DeleteUserUsecase(userRepository);
    }

    public async execute(input: DeleteUserInputDto): Promise<void> {
        const user = await this.userRepository.find(input.id);
        if (!user) throw new HttpException(404, "Usuário não localizado com esse ID");

        await this.userRepository.delete(input.id);

        return;
    }
}
