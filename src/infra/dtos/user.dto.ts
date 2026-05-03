import z from "zod";

export const createUserDto = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    email: z.email().nonempty("Digite um email válido"),
    password: z
        .string()
        .min(8, "A senha deve conter no mínimo 8 caracteres")
        .max(56, "A senha deve conter no máximo 56 caracteres")
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/|\\]).+$/,
            "A senha deve conter números, letras maiúsculas, letras minúsculas e caracteres especiais",
        ),
});

export const findUserDto = z.object({
    id: z.string().nonempty(),
});

export const listUserDto = z.object({
    page: z.number().default(1),
    limit: z.number().default(10),
    keyword: z.string().optional(),
});

export const updateUserDto = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    email: z.email().nonempty("Digite um email válido"),
});

export const updatePasswordDto = z.object({
    currentPassword: z.string().nonempty("A senha atual é obrigatória"),
    newPassword: z
        .string()
        .min(8, "A nova senha deve conter no mínimo 8 caracteres")
        .max(56, "A nova senha deve conter no máximo 56 caracteres")
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/|\\]).+$/,
            "A nova senha deve conter números, letras maiúsculas, letras minúsculas e caracteres especiais",
        ),
});
