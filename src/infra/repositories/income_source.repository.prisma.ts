import { PrismaClient } from "../../../generated/client";
import {
    IncomeSourceCountArgs,
    IncomeSourceFindManyArgs,
} from "../../../generated/models";
import { IncomeSource, RecurrenceType } from "../../domain/entities/income_source";
import {
    IncomeSourceInterface,
    ListIncomeSourceFilters,
} from "../../domain/interfaces/income_source.interface";

export class IncomeSourceRespositoryPrisma implements IncomeSourceInterface {
    private constructor(private readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new IncomeSourceRespositoryPrisma(prisma);
    }

    public async create(incomeSource: IncomeSource): Promise<void> {
        await this.prisma.incomeSource.create({
            data: {
                id: incomeSource.id,
                name: incomeSource.name,
                amount: incomeSource.amount,
                recurrence: incomeSource.recurrence,
                isActive: incomeSource.isActive,
                startDate: incomeSource.startDate,
                endDate: incomeSource.endDate,
                category: { connect: { id: incomeSource.categoryId } },
                user: { connect: { id: incomeSource.userId } },
            },
        });

        return;
    }

    public async find(id: string): Promise<IncomeSource | undefined> {
        const aIncomeSource = await this.prisma.incomeSource.findUnique({
            where: { id },
        });

        if (!aIncomeSource) return;

        const output = IncomeSource.with({
            id: aIncomeSource.id,
            name: aIncomeSource.name,
            amount: aIncomeSource.amount,
            recurrence: aIncomeSource.recurrence as RecurrenceType,
            isActive: aIncomeSource.isActive,
            startDate: aIncomeSource.startDate,
            endDate: aIncomeSource.endDate,
            categoryId: aIncomeSource.categoryId,
            userId: aIncomeSource.userId,
        });

        return output;
    }

    public async list(
        filters: ListIncomeSourceFilters,
    ): Promise<{ data: Array<IncomeSource>; total: number }> {
        const { userId, categoryId, isActive, month, pagination, recurrence } = filters;

        let query: IncomeSourceFindManyArgs = {
            where: {
                userId,
            },
        };

        let count: IncomeSourceCountArgs = {
            where: {
                userId,
            },
        };

        if (isActive) {
            query.where = {
                ...query.where,
                isActive,
            };

            count.where = {
                ...count.where,
                isActive,
            };
        }

        if (categoryId) {
            query.where = {
                ...query.where,
            };

            count.where = {
                ...count.where,
            };
        }

        if (recurrence) {
            query.where = {
                ...query.where,
            };

            count.where = {
                ...count.where,
            };
        }

        if (month) {
            const startOfMonth = new Date(month.year, month.month - 1, 1);
            const endOfMonth = new Date(month.year, month.month, 0, 23, 59, 59);

            query.where = {
                ...query.where,
                startDate: { lte: endOfMonth },
                endDate: { gte: startOfMonth },
            };

            count.where = {
                ...count.where,
                startDate: { lte: endOfMonth },
                endDate: { gte: startOfMonth },
            };
        }

        if (pagination) {
            const { page, pageSize } = pagination;

            query = {
                ...query,
                take: pageSize,
                skip: (page - 1) * pageSize,
            };
        }

        const [data, total] = await Promise.all([
            this.prisma.incomeSource.findMany(query),
            this.prisma.incomeSource.count(count),
        ]);

        const incomeSourceList = data.map((income) =>
            IncomeSource.with({
                id: income.id,
                name: income.name,
                amount: income.amount,
                recurrence: income.recurrence as RecurrenceType,
                isActive: income.isActive,
                startDate: income.startDate,
                endDate: income.endDate,
                categoryId: income.categoryId,
                userId: income.userId,
            }),
        );

        return {
            data: incomeSourceList,
            total,
        };
    }

    public async update(incomeSource: Omit<IncomeSource, "userId">): Promise<void> {
        await this.prisma.incomeSource.update({
            where: { id: incomeSource.id },
            data: {
                name: incomeSource.name,
                amount: incomeSource.amount,
                recurrence: incomeSource.recurrence,
                startDate: incomeSource.startDate,
                endDate: incomeSource.endDate,
                isActive: incomeSource.isActive,
                category: {
                    connect: { id: incomeSource.categoryId },
                },
            },
        });

        return;
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.incomeSource.delete({
            where: { id },
        });

        return;
    }
}
