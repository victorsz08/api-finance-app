import { prisma } from "../../packages/db";
import { CreateUserUsecase } from "../../usecase/user/create";
import { DeleteUserUsecase } from "../../usecase/user/delete";
import { FindUserUsecase } from "../../usecase/user/find";
import { ListUserUsecase } from "../../usecase/user/list";
import { UpdateUserUsecase } from "../../usecase/user/update";
import { UpdatePasswordUserUsecase } from "../../usecase/user/update-password";
import { CreateUserRoute } from "../api/express/routes/user/create.route";
import { DeleteUserRoute } from "../api/express/routes/user/delete";
import { FindUserRoute } from "../api/express/routes/user/find.route";
import { ListUserRoute } from "../api/express/routes/user/list.route";
import { UpdateUserPasswordRoute } from "../api/express/routes/user/update-password.route";
import { UpdateUserRoute } from "../api/express/routes/user/update.route";
import { UserRepositoryPrisma } from "../repositories/user.repository.prisma";

const userRepository = UserRepositoryPrisma.build(prisma);

const createUserService = CreateUserUsecase.build(userRepository);
const findUserService = FindUserUsecase.build(userRepository);
const listUserService = ListUserUsecase.build(userRepository);
const updateUserService = UpdateUserUsecase.build(userRepository);
const updatePasswordUserService = UpdatePasswordUserUsecase.build(userRepository);
const deleteUserService = DeleteUserUsecase.build(userRepository);

const createUserRoute = CreateUserRoute.build(createUserService);
const findUserRoute = FindUserRoute.build(findUserService);
const listUserRoute = ListUserRoute.build(listUserService);
const updateUserRoute = UpdateUserRoute.build(updateUserService);
const updatePasswordUserRoute = UpdateUserPasswordRoute.build(updatePasswordUserService);
const deleteUserRoute = DeleteUserRoute.build(deleteUserService);

export const userModule = [
    createUserRoute,
    findUserRoute,
    listUserRoute,
    updateUserRoute,
    updatePasswordUserRoute,
    deleteUserRoute,
];
