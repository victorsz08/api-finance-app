import { v4 as uuid } from "uuid";
export type FixedExpenseProps = {
    id: string;
    name: string;
    amount: number;
    dueDay: number;
    isActive: boolean;
    startDate: Date;
    categoryId: string;
    userId: string;
};

export class FixedExpense {
    private constructor(private readonly props: FixedExpenseProps) {}

    public static build(input: Omit<FixedExpenseProps, "id" | "isActive">) {
        return new FixedExpense({
            id: uuid(),
            name: input.name,
            amount: input.amount,
            dueDay: input.dueDay,
            isActive: true,
            startDate: input.startDate,
            categoryId: input.categoryId,
            userId: input.userId,
        });
    }

    public static with(props: FixedExpenseProps) {
        return new FixedExpense(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get amount() {
        return this.props.amount;
    }

    public get dueDay() {
        return this.props.dueDay;
    }

    public get isActive() {
        return this.props.isActive;
    }

    public get startDate() {
        return this.props.startDate;
    }

    public get categoryId() {
        return this.props.categoryId;
    }

    public get userId() {
        return this.props.userId;
    }
}
