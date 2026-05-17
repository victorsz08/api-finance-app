import { prisma } from "../../packages/db";
import { CreateFixedExpenseUsecase } from "../../usecase/fixed_expense/create";
import { DeleteFixedExpenseUsecase } from "../../usecase/fixed_expense/delete";
import { FindFixedExpenseUsecase } from "../../usecase/fixed_expense/find";
import { ListFixedExpenseUsecase } from "../../usecase/fixed_expense/list";
import { UpdateFixedExpenseUsecase } from "../../usecase/fixed_expense/update";
import { CreateFixedExpenseRoute } from "../api/express/routes/fixed_expense/create.route";
import { DeleteFixedExpenseRoute } from "../api/express/routes/fixed_expense/delete.route";
import { FindFixedExpenseRoute } from "../api/express/routes/fixed_expense/find.route";
import { ListFixedExpenseRoute } from "../api/express/routes/fixed_expense/list.route";
import { UpdateFixedExpenseRoute } from "../api/express/routes/fixed_expense/update.route";
import { FixedExpenseRepositoryPrisma } from "../repositories/fixed_expense.repository.prisma";

const fixedExpenseRepositoryPrisma = FixedExpenseRepositoryPrisma.build(prisma);

const createFixedExpenseService = CreateFixedExpenseUsecase.build(
    fixedExpenseRepositoryPrisma,
);
const findFixedExpenseService = FindFixedExpenseUsecase.build(
    fixedExpenseRepositoryPrisma,
);
const listFixedExpenseService = ListFixedExpenseUsecase.build(
    fixedExpenseRepositoryPrisma,
);
const updateFixedExpenseService = UpdateFixedExpenseUsecase.build(
    fixedExpenseRepositoryPrisma,
);
const deleteFixedExpenseService = DeleteFixedExpenseUsecase.build(
    fixedExpenseRepositoryPrisma,
);

const createFixedExpenseRoute = CreateFixedExpenseRoute.build(createFixedExpenseService);
const findFixedExpenseRoute = FindFixedExpenseRoute.build(findFixedExpenseService);
const listFixedExpenseRoute = ListFixedExpenseRoute.build(listFixedExpenseService);
const updateFixedExpenseRoute = UpdateFixedExpenseRoute.build(updateFixedExpenseService);
const deleteFixedExpenseRoute = DeleteFixedExpenseRoute.build(deleteFixedExpenseService);

export const FixedExpenseModule = [
    createFixedExpenseRoute,
    findFixedExpenseRoute,
    listFixedExpenseRoute,
    updateFixedExpenseRoute,
    deleteFixedExpenseRoute,
];
