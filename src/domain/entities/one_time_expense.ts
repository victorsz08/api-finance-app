import { v4 as uuid } from "uuid";

export type OneTimeExpenseProps = {
    id: string;
    description: string;
    amount: number;
    date: Date;
    note: string;
    userId: string;
    categoryId: string;
};

export class OneTimeExpense {
    private constructor(private readonly props: OneTimeExpenseProps) {}

    public static build(input: Omit<OneTimeExpenseProps, "id" | "date">) {
        return new OneTimeExpense({
            id: uuid(),
            date: new Date(),
            ...input,
        });
    }

    public static with(props: OneTimeExpenseProps) {
        return new OneTimeExpense(props);
    }

    public get id() {
        return this.props.id;
    }

    public get description() {
        return this.props.description;
    }

    public get amount() {
        return this.props.amount;
    }

    public get date() {
        return this.props.date;
    }

    public get note() {
        return this.props.note;
    }

    public get userId() {
        return this.props.userId;
    }

    public get categoryId() {
        return this.props.categoryId;
    }
}
