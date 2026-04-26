import { User } from "../../domain/entities/user";
import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";




export type CreateUserInputDto = {
    name: string;
    email: string;
    password: string;
};

export type CreateUserOutputDto = {
    id: string;
};


export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
    private constructor(private readonly userRepository: UserInterface) {};
    
    public static build(userRepository: UserInterface) {
        return new CreateUserUsecase(userRepository)
    }
    
    public async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
        const { name, email, password } = input;

        const userEmailAlreadyExists = await this.userRepository.findByEmail(email);
        if(userEmailAlreadyExists) throw new HttpException(409, "Email indisponível");

        const user = await User.build({ name, email, password });
        await this.userRepository.create(user);

        const output: CreateUserOutputDto = { id: user.id };
        return output;
    };
}