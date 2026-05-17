import { InstallmentPlans, StatusInstallmentPlans } from "../entities/installment_plans";

export type ListInstallmentPlansFilters = {
    userId: string;
    categoryId?: string;
    status?: StatusInstallmentPlans;
    month?: {
        year: number;
        month: number;
    };
    pagination?: { page: number; pageSize: number };
};

export interface ListInstallmentPlansInterface {
    create(installmentPlans: InstallmentPlans): Promise<void>;
    find(id: string): Promise<InstallmentPlans>;
    list(
        filters: ListInstallmentPlansFilters,
    ): Promise<{ data: Array<InstallmentPlans>; total: number }>;
    update(installmentPlans: Omit<InstallmentPlans, "userId">): Promise<void>;
    delete(id: string): Promise<void>;
}
