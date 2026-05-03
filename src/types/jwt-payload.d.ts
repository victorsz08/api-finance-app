export type TypePayload = "access" | "refresh";
export interface JwtPayload {
    id: string;
    type: TypePayload;
}
