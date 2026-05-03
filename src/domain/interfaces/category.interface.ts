import { Category } from "../entities/categories";

export interface CategoryInterface {
    create(category: Category): Promise<void>;
    find(id: string): Promise<Category | undefined>;
    findByName(name: string): Promise<Category | undefined>;
    list(userId: string): Promise<Array<Category>>;
    update(category: Omit<Category, "createdAt" | "userId">): Promise<void>;
    delete(id: string): Promise<void>;
}
