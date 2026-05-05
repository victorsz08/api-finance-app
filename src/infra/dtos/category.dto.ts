import z from "zod";
import { CategoryType } from "../../domain/entities/categories";

export const createCategoryDto = z.object({
    name: z.string().nonempty("O campo nome não pode ser vazio"),
    type: z.enum(CategoryType),
    color: z.string().nonempty("O campo cor não pode ser vazio"),
});

export const findCategoryDto = z.object({
    id: z.string().nonempty("O ID da categoria é obrigatório"),
});

export const updateCategoryDto = z.object({
    name: z.string().nonempty("O campo nome não pode ser vazio"),
    type: z.enum(CategoryType),
    color: z.string().nonempty("O campo cor não pode ser vazio"),
});
