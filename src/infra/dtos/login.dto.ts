import z from "zod";

export const authLoginDto = z.object({
    email: z.email().nonempty("Digite um email válido"),
    password: z.string().nonempty("A senha não pode ser vazia"),
});
