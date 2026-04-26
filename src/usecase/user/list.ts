import { ListUserOutput, UserInterface } from "../../domain/interfaces/user.interface";
import { Usecase } from "../usecase";


export type ListUserInputDto = {
    page: number;
    limit: number;
    keywords?: string | undefined;
};

export type ListUserOutputDto = {
    users: Array<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    total: number;
    totalPages: number;
};

export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDto> {
    private constructor(private readonly userRepository: UserInterface) {};
    
    public static build(userRepository: UserInterface) {
        return new ListUserUsecase(userRepository)
    }

    public async execute(input: ListUserInputDto): Promise<ListUserOutputDto> {
        const data = await this.userRepository.list(input);

        const output = this.present(data);
        return output;
    };

    private present(data: ListUserOutput): ListUserOutputDto {
        return {
            users: data.users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            })),
            total: data.total,
            totalPages: data.totalPages
        }
    }
}