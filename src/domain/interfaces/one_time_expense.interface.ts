import { OneTimeExpense } from "../entities/one_time_expense";

export type ListOneTimeExpenseFilters = {
    userId: string;
    categoryId?: string;
    month?: { year: number; month: number };
    amountRange?: { min: number; max: number };
    pagination?: { page: number; pageSize: number };
};

export interface OneTimeExpenseInterface {
    create(oneTimeExpense: OneTimeExpense): Promise<void>;
    find(id: string): Promise<OneTimeExpense | undefined>;
    list(
        filters: ListOneTimeExpenseFilters,
    ): Promise<{ data: Array<OneTimeExpense>; total: number }>;
    update(oneTimeExpense: Omit<OneTimeExpense, "userId">): Promise<void>;
    delete(id: string): Promise<void>;
}
