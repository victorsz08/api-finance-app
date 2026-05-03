import { hash } from "bcryptjs";
import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../middleware/http-exception";
import { Usecase } from "../usecase";
import { sign } from "jsonwebtoken";
import { JwtPayload } from "../../types/jwt-payload";

export type AuthLoginInputDto = {
    email: string;
    password: string;
};

export type AuthLoginOutputDto = {
    acessToken: string;
    refreshToken: string;
};

export class AuthLoginUsecase implements Usecase<AuthLoginInputDto, AuthLoginOutputDto> {
    private constructor(private readonly userRepository: UserInterface) {}

    public static build(userRespository: UserInterface) {
        return new AuthLoginUsecase(userRespository);
    }

    public async execute(input: AuthLoginInputDto): Promise<AuthLoginOutputDto> {
        const { email, password } = input;

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new HttpException(400, "Email ou senha incorretos");

        const validatePassword = await hash(password, user.password);
        if (!validatePassword) throw new HttpException(400, "Email ou senha incorretos");

        const acessToken = sign(
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
            acessToken,
            refreshToken,
        };
    }
}
