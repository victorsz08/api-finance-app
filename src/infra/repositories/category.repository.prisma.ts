import { PrismaClient } from "../../../generated/client";
import { Category, CategoryType } from "../../domain/entities/categories";
import { CategoryInterface } from "../../domain/interfaces/category.interface";

export class CategoryRepositoryPrisma implements CategoryInterface {
    private constructor(private readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new CategoryRepositoryPrisma(prisma);
    }

    public async create(category: Category): Promise<void> {
        await this.prisma.category.create({
            data: {
                id: category.id,
                name: category.name,
                type: category.type,
                color: category.color,
                user: { connect: { id: category.userId } },
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            },
        });

        return;
    }

    public async find(id: string): Promise<Category | undefined> {
        const category = await this.prisma.category.findUnique({
            where: {
                id,
            },
        });

        if (!category) return;

        const output = Category.with({
            id: category.id,
            name: category.name,
            type: category.type as CategoryType,
            color: category.color,
            userId: category.userId,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        });

        return output;
    }

    public async findByName(name: string): Promise<Category | undefined> {
        const category = await this.prisma.category.findUnique({
            where: { name },
        });

        if (!category) return;

        const output = Category.with({
            id: category.id,
            name: category.name,
            type: category.type as CategoryType,
            color: category.color,
            userId: category.userId,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        });

        return output;
    }

    public async list(userId: string): Promise<Array<Category>> {
        const categories = await this.prisma.category.findMany({
            where: { userId },
        });

        const output = categories.map((category) =>
            Category.with({
                id: category.id,
                name: category.name,
                type: category.type as CategoryType,
                color: category.color,
                userId: category.userId,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            }),
        );

        return output;
    }

    public async update(category: Omit<Category, "createdAt" | "userId">): Promise<void> {
        const { id, name, type, color, updatedAt } = category;

        await this.prisma.category.update({
            where: { id },
            data: {
                name,
                type,
                color,
                updatedAt,
            },
        });

        return;
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.category.delete({
            where: { id },
        });

        return;
    }
}
