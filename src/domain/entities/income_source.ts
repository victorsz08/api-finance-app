import { v4 as uuid } from "uuid";

export type IncomeSourceProps = {
    id: string;
    name: string;
    amount: number;
    recurrence: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    userId: string;
    categoryId: string;
};

export class IncomeSource {
    private constructor(private readonly props: IncomeSourceProps) {}

    public static build({
        name,
        amount,
        recurrence,
        startDate,
        endDate,
        userId,
        categoryId,
    }: Omit<IncomeSourceProps, "id" | "isActive">) {
        return new IncomeSource({
            id: uuid(),
            name,
            amount,
            recurrence,
            startDate,
            endDate,
            userId,
            categoryId,
            isActive: true,
        });
    }

    public static with(props: IncomeSourceProps) {
        return new IncomeSource(props);
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

    public get recurrence() {
        return this.props.recurrence;
    }

    public get startDate() {
        return this.props.startDate;
    }

    public get endDate() {
        return this.props.endDate;
    }

    public get isActive() {
        return this.props.isActive;
    }

    public get userId() {
        return this.props.userId;
    }

    public get categoryId() {
        return this.props.categoryId;
    }
}
