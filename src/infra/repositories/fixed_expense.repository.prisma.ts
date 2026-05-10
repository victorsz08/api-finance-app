import { PrismaClient } from "../../../generated/client";
import {
    FixedExpenseCountArgs,
    FixedExpenseCreateArgs,
    FixedExpenseCreateInput,
    FixedExpenseFindManyArgs,
} from "../../../generated/models";
import { FixedExpense } from "../../domain/entities/fixed_expense";
import {
    FixedExpenseInterface,
    ListFixedExpenseFilters,
} from "../../domain/interfaces/fixed_expense.interface";

export class FixedExpenseRepositoryPrisma implements FixedExpenseInterface {
    private constructor(private readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new FixedExpenseRepositoryPrisma(prisma);
    }

    public async create(fixedExpense: FixedExpense): Promise<void> {
        await this.prisma.fixedExpense.create({
            data: {
                id: fixedExpense.id,
                name: fixedExpense.name,
                amount: fixedExpense.amount,
                isActive: fixedExpense.isActive,
                startDate: fixedExpense.startDate,
                dueDay: fixedExpense.dueDay,
                category: {
                    connect: { id: fixedExpense.categoryId },
                },
                user: {
                    connect: { id: fixedExpense.userId },
                },
            },
        });

        return;
    }

    public async find(id: string): Promise<FixedExpense | undefined> {
        const fixedExpense = await this.prisma.fixedExpense.findUnique({
            where: { id },
        });

        if (!fixedExpense) return;

        const output = FixedExpense.with(fixedExpense);
        return output;
    }

    public async list(
        input: ListFixedExpenseFilters,
    ): Promise<{ data: Array<FixedExpense>; total: number }> {
        const { userId, categoryId, dueDayRange, isActive, month, pagination } = input;

        let query: FixedExpenseFindManyArgs = {
            where: {
                user: { id: userId },
            },
        };

        let count: FixedExpenseCountArgs = {
            where: {
                user: { id: userId },
            },
        };

        if (categoryId) {
            query.where = {
                ...query.where,
                category: { id: categoryId },
            };

            count.where = {
                ...count.where,
                category: { id: categoryId },
            };
        }

        if (dueDayRange) {
            query.where = {
                ...query.where,
                dueDay: {
                    gte: dueDayRange.min,
                    lte: dueDayRange.max,
                },
            };

            count.where = {
                ...count.where,
                dueDay: {
                    gte: dueDayRange.min,
                    lte: dueDayRange.max,
                },
            };
        }

        if (isActive) {
            query.where = {
                ...query.where,
                isActive: isActive,
            };

            count.where = {
                ...count.where,
                isActive: isActive,
            };
        }

        if (month) {
            const endOfMonth = new Date(month.year, month.month, 0, 23, 59, 59);

            query.where = {
                ...query.where,
                startDate: {
                    lte: endOfMonth,
                },
            };

            count.where = {
                ...count.where,
                startDate: {
                    lte: endOfMonth,
                },
            };
        }

        if (pagination) {
            query = {
                ...query,
                take: pagination.pageSize,
                skip: (pagination.page - 1) * pagination.pageSize,
            };
        }

        const [fixedExpenses, total] = await Promise.all([
            this.prisma.fixedExpense.findMany(query),
            this.prisma.fixedExpense.count(count),
        ]);

        const data = fixedExpenses.map((item) => FixedExpense.with(item));
        return { data, total };
    }

    public async update(fixedExpense: Omit<FixedExpense, "userId">): Promise<void> {
        await this.prisma.fixedExpense.update({
            where: { id: fixedExpense.id },
            data: {
                name: fixedExpense.name,
                amount: fixedExpense.amount,
                dueDay: fixedExpense.dueDay,
                startDate: fixedExpense.startDate,
                isActive: fixedExpense.isActive,
                category: {
                    connect: { id: fixedExpense.id },
                },
            },
        });

        return;
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.fixedExpense.delete({ where: { id } });

        return;
    }
}
