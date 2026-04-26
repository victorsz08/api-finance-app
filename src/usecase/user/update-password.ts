import { compare, hash } from "bcryptjs";
import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type UpdatePasswordUserInputDto = {
    id: string;
    currentPassword: string;
    newPassword: string;
};

export type UpdatePasswordUserOutputDto = {
    id: string;
};

export class UpdatePasswordUserUsecase implements Usecase<
    UpdatePasswordUserInputDto,
    UpdatePasswordUserOutputDto
> {
    private constructor(private readonly userRepository: UserInterface) {}

    public static build(userRepository: UserInterface) {
        return new UpdatePasswordUserUsecase(userRepository);
    }

    public async execute(
        input: UpdatePasswordUserInputDto,
    ): Promise<UpdatePasswordUserOutputDto> {
        const { id, currentPassword, newPassword } = input;

        const user = await this.userRepository.find(id);
        if (!user) throw new HttpException(404, "Usuário não localizado com esse ID");

        const currentPassIsValid = await compare(currentPassword, user.password);
        if (!currentPassIsValid) throw new HttpException(401, "Senha atual inválida");

        const newPasswordHashed = await hash(newPassword, 12);
        const updatedAt = new Date();

        await this.userRepository.updatePassword({
            id,
            password: newPasswordHashed,
            updatedAt,
        });

        const output: UpdatePasswordUserOutputDto = {
            id: user.id,
        };

        return output;
    }
}
