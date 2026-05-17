import z, { date } from "zod";

export const CreateOneTimeExpenseDto = z.object({
    description: z.string({
        error: "O campo descrição é obrigatório",
    }),
    amount: z
        .number({
            error: "Valor é obrigatório",
            message: "Valor deve ser um número",
        })
        .positive("Valor deve ser maior que zero")
        .multipleOf(0.01, "Valor deve ter no máximo 2 casas decimais"),
    date: z.coerce.date({
        error: "O campo data é obrigatório",
    }),
    note: z
        .string({
            error: "O campo anotação é obrigatório",
        })
        .trim(),
    categoryId: z.string({
        error: "A categoria é obrigatória",
    }),
});

export const FindOneTimeExpenseDto = z.object({
    id: z.string({
        error: "O ID do gasto pontual é obrigatório",
    }),
});

export const ListOneTimeExpenseDto = z.object({
    categoryId: z.string().optional(),
    page: z.number().default(1),
    pageSize: z.number().default(10),
    month: z.string().optional(),
    amountRangeMin: z.string().optional(),
    amountRangeMax: z.string().optional(),
});

export const UpdateOneTimeExpenseDto = z.object({
    description: z.string({
        error: "O campo descrição é obrigatório",
    }),
    amount: z
        .number({
            error: "Valor é obrigatório",
            message: "Valor deve ser um número",
        })
        .positive("Valor deve ser maior que zero")
        .multipleOf(0.01, "Valor deve ter no máximo 2 casas decimais"),
    date: z.coerce.date({
        error: "O campo data é obrigatório",
    }),
    note: z
        .string({
            error: "O campo anotação é obrigatório",
        })
        .trim(),
    categoryId: z.string({
        error: "A categoria é obrigatória",
    }),
});
