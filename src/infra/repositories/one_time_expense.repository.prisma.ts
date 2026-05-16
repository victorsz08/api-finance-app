import { PrismaClient } from "../../../generated/client";
import {
    OneTimeExpenseCountArgs,
    OneTimeExpenseFindManyArgs,
} from "../../../generated/models";
import { OneTimeExpense } from "../../domain/entities/one_time_expense";
import {
    ListOneTimeExpenseFilters,
    OneTimeExpenseInterface,
} from "../../domain/interfaces/one_time_expense.interface";

export class OneTimeExpenseRespositoryPrisma implements OneTimeExpenseInterface {
    private constructor(private readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new OneTimeExpenseRespositoryPrisma(prisma);
    }

    public async create(oneTimeExpense: OneTimeExpense): Promise<void> {
        const { id, description, amount, date, note, categoryId, userId } =
            oneTimeExpense;

        await this.prisma.oneTimeExpense.create({
            data: {
                id,
                description,
                amount,
                date,
                note,
                category: { connect: { id: categoryId } },
                user: { connect: { id: userId } },
            },
        });

        return;
    }

    public async find(id: string): Promise<OneTimeExpense | undefined> {
        const oneTimeExpense = await this.prisma.oneTimeExpense.findUnique({
            where: { id },
        });

        if (!oneTimeExpense) return;

        const output = OneTimeExpense.with(oneTimeExpense);
        return output;
    }

    public async list(
        filters: ListOneTimeExpenseFilters,
    ): Promise<{ data: Array<OneTimeExpense>; total: number }> {
        const { userId, categoryId, pagination, month, amountRange } = filters;

        const query: OneTimeExpenseFindManyArgs = {
            where: {
                userId,
            },
        };

        const count: OneTimeExpenseCountArgs = {
            where: {
                userId,
            },
        };

        if (categoryId) {
            query.where = {
                ...query.where,
                categoryId,
            };

            count.where = {
                ...count.where,
                categoryId,
            };
        }

        if (pagination) {
            const { page, pageSize } = pagination;

            query.skip = (page - 1) * pageSize;
            query.take = pageSize;
        }

        if (amountRange) {
            const { min, max } = amountRange;

            query.where = {
                ...query.where,
                amount: {
                    gte: min,
                    lte: max,
                },
            };

            count.where = {
                ...count.where,
                amount: {
                    gte: min,
                    lte: max,
                },
            };
        }

        if (month) {
            query.where = {
                ...query.where,
                date: {
                    gte: new Date(month.year, month.month - 1, 1),
                    lte: new Date(month.year, month.month, 0, 23, 59, 59),
                },
            };

            count.where = {
                ...count.where,
                date: {
                    gte: new Date(month.year, month.month - 1, 1),
                    lte: new Date(month.year, month.month, 0, 23, 59, 59),
                },
            };
        }

        const [data, total] = await Promise.all([
            this.prisma.oneTimeExpense.findMany(query),
            this.prisma.oneTimeExpense.count(count),
        ]);

        const oneTimeExpenseList = data.map((item) => OneTimeExpense.with(item));

        return {
            data: oneTimeExpenseList,
            total,
        };
    }

    public async update(oneTimeExpense: Omit<OneTimeExpense, "userId">): Promise<void> {
        const { id, description, amount, date, note, categoryId } = oneTimeExpense;

        await this.prisma.oneTimeExpense.update({
            where: { id },
            data: {
                description,
                amount,
                date,
                note,
                category: { connect: { id: categoryId } },
            },
        });

        return;
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.oneTimeExpense.delete({ where: { id } });

        return;
    }
}
