import { v4 as uuid } from "uuid";

export type CategoryType = "income" | "expense";
export const CategoryType = {
    INCOME: "income" as CategoryType,
    EXPENSE: "expense" as CategoryType,
} as const;

export type CategoryProps = {
    id: string;
    name: string;
    type: CategoryType;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class Category {
    private constructor(private readonly props: CategoryProps) {}

    public static build(category: {
        name: string;
        type: CategoryType;
        color: string;
        userId: string;
    }) {
        return new Category({
            id: uuid(),
            name: category.name,
            type: category.type,
            color: category.color,
            userId: category.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    public static with(props: CategoryProps) {
        return new Category(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get type() {
        return this.props.type;
    }

    public get color() {
        return this.props.color;
    }

    public get userId() {
        return this.props.userId;
    }

    public get createdAt() {
        return this.props.createdAt;
    }

    public get updatedAt() {
        return this.props.updatedAt;
    }
}
