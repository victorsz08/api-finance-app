


export class HttpException extends Error {
    declare statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message),
        this.statusCode = statusCode
    };
}