import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import cookieParser from "cookie-parser";
import { handleErrors } from "../../../middleware/handle-errors";

export class ApiExpress implements Api {
    declare public app: Express;

    private constructor(routes: Array<Route>) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cookieParser());

        this.addRoutes(routes);
        this.app.use(handleErrors());
    }

    public static build(routes: Array<Route>) {
        return new ApiExpress(routes);
    }

    public getAppExpress() {
        return this.app;
    }
    private addRoutes(routes: Array<Route>) {
        routes.forEach((route) => {
            const handler = route.getHandler();
            const path = route.getPath();
            const method = route.getMethod();
            const middlewares = route.getMiddlewares().map((mid) => mid.handle);

            this.app[method](path, ...middlewares, handler);
        });
    }

    public start(port: number): void {
        throw new Error("Method not implemented.");
    }
}
