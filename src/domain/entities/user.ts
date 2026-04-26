import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";


export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};


export class User {
    private constructor(private readonly props: UserProps) {};

    public static async build({ name, email, password } : Omit<UserProps, "id" | "createdAt" | "updatedAt">) {
        return new User({
            id: uuid(),
            name: name,
            email: email,
            password: await hash(password, 12),
            createdAt: new Date(),
            updatedAt: new Date()
        })
    };

    public static with(user: UserProps) {
        return new User(user);
    };

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get email() {
        return this.props.email;
    }

    public get password() {
        return this.props.password;
    }

    public get createdAt() {
        return this.props.createdAt;
    }

    public get updatedAt() {
        return this.props.updatedAt;
    }
}