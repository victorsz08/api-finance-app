import z from "zod";

export const createIncomeSourceDto = z.object({
    name: z
        .string({
            error: "Nome é obrigatório",
        })
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

    recurrence: z.enum(["monthly", "weekly", "once"], {
        error: "Recorrência é obrigatória",
        message: "Recorrência deve ser monthly, weekly ou once",
    }),

    startDate: z.coerce.date({
        error: "Data de início é obrigatória",
        message: "Data de início inválida",
    }),

    endDate: z.coerce.date({
        error: "Data de fim inválida",
    }),

    categoryId: z.string({
        error: "Categoria é obrigatória",
    }),
});

export const findIncomeSourceDto = z.object({
    id: z.string({
        error: "Id da fonte de renda é obrigatório!",
    }),
});

export const listIncomeSourceDto = z.object({
    categoryId: z.string().uuid().optional(),
    isActive: z.enum(["true", "false"]).optional(),
    recurrence: z.enum(["monthly", "weekly", "once"]).optional(),
    month: z
        .string()
        .regex(/^\d{4}-\d{2}$/, "Formato esperado: YYYY-MM")
        .optional(),
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const updateIncomeSourceDto = z.object({
    name: z
        .string({
            error: "Nome é obrigatório",
        })
        .min(2, "Nome deve ter ao menos 2 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres")
        .trim(),

    isActive: z.boolean({
        error: "Estado da fonte de renda é obrigatório ",
    }),

    amount: z
        .number({
            error: "Valor é obrigatório",
            message: "Valor deve ser um número",
        })
        .positive("Valor deve ser maior que zero")
        .multipleOf(0.01, "Valor deve ter no máximo 2 casas decimais"),

    recurrence: z.enum(["monthly", "weekly", "once"], {
        error: "Recorrência é obrigatória",
        message: "Recorrência deve ser monthly, weekly ou once",
    }),

    startDate: z.coerce.date({
        error: "Data de início é obrigatória",
        message: "Data de início inválida",
    }),

    endDate: z.coerce.date({
        error: "Data de fim inválida",
    }),

    categoryId: z.string({
        error: "Categoria é obrigatória",
    }),
});
