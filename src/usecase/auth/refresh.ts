import { sign } from "jsonwebtoken";
import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";

export type AuthRefreshInputDto = {
    id: string;
};

export type AuthRefreshOutputDto = {
    accessToken: string;
    refreshToken: string;
};

export class AuthRefreshUsecase implements Usecase<
    AuthRefreshInputDto,
    AuthRefreshOutputDto
> {
    private constructor(private readonly userRepository: UserInterface) {}

    public static build(userRepository: UserInterface) {
        return new AuthRefreshUsecase(userRepository);
    }

    public async execute(input: AuthRefreshInputDto): Promise<AuthRefreshOutputDto> {
        const { id } = input;

        const user = await this.userRepository.find(id);
        if (!user) throw new HttpException(404, "Usuário não localizado com esse ID");

        const accessToken = sign(
            {
                id: user.id,
                type: "access",
            },
            String(process.env.AUTH_SECRET),
            { expiresIn: "15m" },
        );

        const refreshToken = sign(
            {
                id: user.id,
                type: "refresh",
            },
            String(process.env.AUTH_SECRET),
            { expiresIn: "7d" },
        );

        return {
            accessToken,
            refreshToken,
        };
    }
}
