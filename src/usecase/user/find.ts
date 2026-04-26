import { User } from "../../domain/entities/user";
import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";




export type FindUserInputDto = {
    id: string;
};

export type FindUserOutputDto = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindUserUsecase implements Usecase<FindUserInputDto, FindUserOutputDto> {
    private constructor(private readonly userRepository: UserInterface) {};
    
    public static build(userRepository: UserInterface) {
        return new FindUserUsecase(userRepository);
    }

    public async execute(input: FindUserInputDto): Promise<FindUserOutputDto> {
        const user = await this.userRepository.find(input.id);

        if(!user) throw new HttpException(404, "Usuário não localizado com esse ID");

        const output = this.present(user);
        return output;
    };


    private present(user: User): FindUserOutputDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}