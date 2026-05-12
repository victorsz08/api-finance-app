import { IncomeSource } from "../entities/income_source";

export type RecurrenceType = "monthly" | "weekly" | "once";
export type ListIncomeSourceFilters = {
    userId: string;
    categoryId?: string;
    recurrence?: RecurrenceType;
    isActive?: boolean;
    month?: { year: number; month: number };
    pagination?: { page: number; pageSize: number };
};

export interface IncomeSourceInterface {
    create(incomeSource: IncomeSource): Promise<void>;
    find(id: string): Promise<IncomeSource | undefined>;
    list(filters: ListIncomeSourceFilters): Promise<{
        data: Array<IncomeSource>;
        total: number;
    }>;
    update(incomeSource: Omit<IncomeSource, "userId">): Promise<void>;
    delete(id: string): Promise<void>;
}
