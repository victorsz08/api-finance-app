import { prisma } from "../../packages/db";
import { AuthLoginUsecase } from "../../usecase/auth/login";
import { AuthRefreshUsecase } from "../../usecase/auth/refresh";
import { FindUserUsecase } from "../../usecase/user/find";
import { AuthLoginRoute } from "../api/express/routes/auth/login.route";
import { AuthLogoutRoute } from "../api/express/routes/auth/logout.route";
import { AuthRefreshRoute } from "../api/express/routes/auth/refresh.route";
import { AuthSessionRoute } from "../api/express/routes/auth/session.route";
import { UserRepositoryPrisma } from "../repositories/user.repository.prisma";

const userRepository = UserRepositoryPrisma.build(prisma);

const authLoginService = AuthLoginUsecase.build(userRepository);
const authRefreshService = AuthRefreshUsecase.build(userRepository);
const findUserService = FindUserUsecase.build(userRepository);

const authLoginRoute = AuthLoginRoute.build(authLoginService);
const authRefreshRoute = AuthRefreshRoute.build(authRefreshService);
const authSessionRoute = AuthSessionRoute.build(findUserService);
const authLogoutRoute = AuthLogoutRoute.build();

export const authModule = [
    authLoginRoute,
    authRefreshRoute,
    authSessionRoute,
    authLogoutRoute,
];
