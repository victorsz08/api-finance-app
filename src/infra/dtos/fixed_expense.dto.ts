import z from "zod";

export const createFixedExpenseDto = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter ao menos 2 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres")
        .trim(),

    amount: z
        .number({
            error: "Valor é obrigatório",
            message: "Valor deve ser um número",
        })
        .positive("Valor deve ser maior que zero")
        .multipleOf(0.01, "Valor deve ter no máximo 2 casas decimais"),

    dueDay: z
        .number({
            error: "Dia de vencimento é obrigatório",
            message: "Dia de vencimento deve ser um número",
        })
        .int("Dia de vencimento deve ser inteiro")
        .min(1, "Dia de vencimento deve ser entre 1 e 31")
        .max(31, "Dia de vencimento deve ser entre 1 e 31"),

    categoryId: z
        .string({
            error: "Categoria é obrigatória",
        })
        .uuid("categoryId inválido"),
});

export const findFixedExpenseDto = z.object({
    id: z.string({ error: "Id da despesa é obrigatório" }),
});

export const listFixedExpenseDto = z
    .object({
        categoryId: z.string().uuid().optional(),
        isActive: z.enum(["true", "false"]).optional(),
        month: z
            .string()
            .regex(/^\d{4}-\d{2}$/, "Formato esperado: YYYY-MM")
            .optional(),
        dueDayMin: z.coerce.number().int().min(1).max(31).optional(),
        dueDayMax: z.coerce.number().int().min(1).max(31).optional(),
        page: z.coerce.number().int().min(1).default(1),
        pageSize: z.coerce.number().int().min(1).max(100).default(20),
    })
    .refine(
        (data) => {
            if (data.dueDayMin && data.dueDayMax) {
                return data.dueDayMin <= data.dueDayMax;
            }
            return true;
        },
        { message: "dueDayMin não pode ser maior que dueDayMax", path: ["dueDayMin"] },
    );

export const updateFixedExpenseDto = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter ao menos 2 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres")
        .trim(),

    amount: z
        .number({
            error: "Valor é obrigatório",
            message: "Valor deve ser um número",
        })
        .positive("Valor deve ser maior que zero")
        .multipleOf(0.01, "Valor deve ter no máximo 2 casas decimais"),

    dueDay: z
        .number({
            error: "Dia de vencimento é obrigatório",
            message: "Dia de vencimento deve ser um número",
        })
        .int("Dia de vencimento deve ser inteiro")
        .min(1, "Dia de vencimento deve ser entre 1 e 31")
        .max(31, "Dia de vencimento deve ser entre 1 e 31"),

    categoryId: z
        .string({
            error: "Categoria é obrigatória",
        })
        .uuid("categoryId inválido"),
});
