import { Prisma } from "../../../generated/browser";
import { PrismaClient } from "../../../generated/client";
import { User } from "../../domain/entities/user";
import { ListUserOutput, UserInterface } from "../../domain/interfaces/user.interface";





export class UserRepositoryPrisma implements UserInterface {
    private constructor(private readonly prisma: PrismaClient) {};

    public static build(prisma: PrismaClient) {
        return new UserRepositoryPrisma(prisma)
    }
    
    public async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: user
        });

        return;
    };

    public async find(id: string): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if(!user) return;

        const output = User.with(user);
        return output;
    }

    public async list(input: { page: number; limit: number; keyword?: string | undefined; }): Promise<ListUserOutput> {
        const { page, limit, keyword } = input;

        let query: Prisma.UserFindManyArgs = {
            take: limit,
            skip: (page > 1 ? page - 1 : 0) * limit  
        };

        let count: Prisma.UserCountArgs = {
            where: {}
        };

        if(keyword) {
            query = {
                ...query,
                where: {
                    AND: [
                        { name: { contains: keyword, mode: "insensitive" }},
                        { email: { contains: keyword, mode: "insensitive" }},
                    ]
                }
            };

            count = {
                where: {
                    AND: [
                        { name: { contains: keyword, mode: "insensitive" }},
                        { email: { contains: keyword, mode: "insensitive" }},
                    ]
                }
            }
        };

        const [data, total] = await Promise.all([
            this.prisma.user.findMany(query),
            this.prisma.user.count(count)
        ]);

        const users = data.map((user) => User.with(user));
        const totalPages = Math.ceil(total / limit);

        return {
            users,
            total,
            totalPages
        }
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if(!user) return;

        const output = User.with(user);
        return output;
    };

    public async update(user: Omit<User, "password" | "createdAt">): Promise<void> {
        const { id, name, email, updatedAt } = user;
        await this.prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                updatedAt
            }
        });

        return;
    };

    public async updatePassword({ id, password, updatedAt, }: { id: string; password: string; updatedAt: Date; }): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: {
                password,
                updatedAt
            }
        });

        return;
    };

    public async delete(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id }});

        return;
    }
}