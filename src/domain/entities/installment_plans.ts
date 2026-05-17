import { v4 as uuid } from "uuid";

export type StatusInstallmentPlans = "active" | "completed" | "canceled";

export type InstallmentPlansProps = {
    id: string;
    description: string;
    totalAmount: number;
    totalInstallments: number;
    installmentAmount: number;
    firstDueDate: Date;
    status: StatusInstallmentPlans;
    userId: string;
    categoryId: string;
};

export class InstallmentPlans {
    private constructor(private readonly props: InstallmentPlansProps) {}

    public static build(installmentPlans: Omit<InstallmentPlansProps, "id">) {
        return new InstallmentPlans({
            id: uuid(),
            ...installmentPlans,
        });
    }

    public static with(props: InstallmentPlansProps) {
        return new InstallmentPlans(props);
    }

    public get id() {
        return this.props.id;
    }

    public get userId() {
        return this.props.userId;
    }

    public get categoryId() {
        return this.props.categoryId;
    }

    public get totalAmount() {
        return this.props.totalAmount;
    }

    public get totalInstallments() {
        return this.props.totalInstallments;
    }

    public get installmentAmount() {
        return this.props.installmentAmount;
    }

    public get description() {
        return this.props.description;
    }

    public get firstDueDate() {
        return this.props.firstDueDate;
    }

    public get status() {
        return this.props.status;
    }
}
