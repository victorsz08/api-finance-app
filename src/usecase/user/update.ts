import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type UpdateUserInputDto = {
    id: string;
    name: string;
    email: string;
};

export type UpdateUserOutputDto = {
    id: string;
};

export class UpdateUserUsecase implements Usecase<
    UpdateUserInputDto,
    UpdateUserOutputDto
> {
    private constructor(private readonly userInterface: UserInterface) {}

    public static build(userInterface: UserInterface) {
        return new UpdateUserUsecase(userInterface);
    }

    public async execute(input: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
        const { id, name, email } = input;

        const user = await this.userInterface.find(id);
        if (!user) throw new HttpException(404, "Usuário não localizado com esse ID");

        if (user.email !== email) {
            const userEmailAlreadyExists = await this.userInterface.findByEmail(email);
            if (userEmailAlreadyExists)
                throw new HttpException(409, "Email indisponível");
        }

        const updatedAt = new Date();

        await this.userInterface.update({ id, name, email, updatedAt });

        const output: UpdateUserOutputDto = {
            id,
        };

        return output;
    }
}
