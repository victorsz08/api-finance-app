import { User } from "../entities/user";

export type ListUserOutput = {
    users: Array<User>;
    total: number;
    totalPages: number;
};

export interface UserInterface {
    create(user: User): Promise<void>;
    find(id: string): Promise<User | undefined>;
    list(input: {
        page: number;
        limit: number;
        keyword?: string | undefined;
    }): Promise<ListUserOutput>;
    findByEmail(email: string): Promise<User | undefined>;
    update(user: Omit<User, "password" | "createdAt">): Promise<void>;
    updatePassword({
        id,
        password,
        updatedAt,
    }: {
        id: string;
        password: string;
        updatedAt: Date;
    }): Promise<void>;
    delete(id: string): Promise<void>;
}
