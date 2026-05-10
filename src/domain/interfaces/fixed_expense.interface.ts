import { FixedExpense } from "../entities/fixed_expense";

export interface ListFixedExpenseFilters {
    userId: string;
    categoryId?: string;
    isActive?: boolean;
    dueDayRange?: { min: number; max: number };
    month?: { year: number; month: number };
    pagination?: { page: number; pageSize: number };
}

export interface FixedExpenseInterface {
    create(fixedExpense: FixedExpense): Promise<void>;
    find(id: string): Promise<FixedExpense | undefined>;
    list(input: ListFixedExpenseFilters): Promise<{
        data: Array<FixedExpense>;
        total: number;
    }>;
    update(fixedExpense: Omit<FixedExpense, "userId">): Promise<void>;
    delete(id: string): Promise<void>;
}
