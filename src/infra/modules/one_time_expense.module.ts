import { prisma } from "../../packages/db";
import { CreateOneTimeExpenseUsecase } from "../../usecase/one_time_expense/create";
import { DeleteOneTimeExpenseUsecase } from "../../usecase/one_time_expense/delete";
import { FindOneTimeExpenseUsecase } from "../../usecase/one_time_expense/find";
import { ListOneTimeExpenseUsecase } from "../../usecase/one_time_expense/list";
import { UpdateOneTimeExpenseUsecase } from "../../usecase/one_time_expense/update";
import { CreateOneTimeExpenseRoute } from "../api/express/routes/one_time_expense/create.route";
import { DeleteOneTimeExpenseRoute } from "../api/express/routes/one_time_expense/delete.route";
import { FindOneTimeExpenseRoute } from "../api/express/routes/one_time_expense/find.route";
import { ListOneTimeExpenseRoute } from "../api/express/routes/one_time_expense/list.route";
import { UpdateOneTimeExpenseRoute } from "../api/express/routes/one_time_expense/update.route";
import { OneTimeExpenseRespositoryPrisma } from "../repositories/one_time_expense.repository.prisma";

const oneTimeExpenseRepositoryPrisma = OneTimeExpenseRespositoryPrisma.build(prisma);

const createOneTimeExpenseService = CreateOneTimeExpenseUsecase.build(
    oneTimeExpenseRepositoryPrisma,
);
const findOneTimeExpenseService = FindOneTimeExpenseUsecase.build(
    oneTimeExpenseRepositoryPrisma,
);
const listOneTimeExpenseService = ListOneTimeExpenseUsecase.build(
    oneTimeExpenseRepositoryPrisma,
);
const updateOneTimeExpenseService = UpdateOneTimeExpenseUsecase.build(
    oneTimeExpenseRepositoryPrisma,
);
const deleteOneTimeExpenseService = DeleteOneTimeExpenseUsecase.build(
    oneTimeExpenseRepositoryPrisma,
);

const createOneTimeExpenseRoute = CreateOneTimeExpenseRoute.build(
    createOneTimeExpenseService,
);
const findOneTimeExpenseRoute = FindOneTimeExpenseRoute.build(findOneTimeExpenseService);
const listOneTimeExpenseRoute = ListOneTimeExpenseRoute.build(listOneTimeExpenseService);
const updateOneTimeExpenseRoute = UpdateOneTimeExpenseRoute.build(
    updateOneTimeExpenseService,
);
const deleteOneTimeExpenseRoute = DeleteOneTimeExpenseRoute.build(
    deleteOneTimeExpenseService,
);

export const OneTimeExpenseModule = [
    createOneTimeExpenseRoute,
    findOneTimeExpenseRoute,
    listOneTimeExpenseRoute,
    updateOneTimeExpenseRoute,
    deleteOneTimeExpenseRoute,
];
