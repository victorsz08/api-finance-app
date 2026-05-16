import { prisma } from "../../packages/db";
import { CreateIncomeSourceUsecase } from "../../usecase/income_source/create";
import { DeleteIncomeSourceUsecase } from "../../usecase/income_source/delete";
import { FindIncomeSourceUsecase } from "../../usecase/income_source/find";
import { ListIncomeSourceUsecase } from "../../usecase/income_source/list";
import { UpdateIncomeSourceUsecase } from "../../usecase/income_source/update";
import { CreateIncomeSourceRoute } from "../api/express/routes/income_source/create.route";
import { DeleteIncomeSourceRoute } from "../api/express/routes/income_source/delete.route";
import { FindIncomeSourceRoute } from "../api/express/routes/income_source/find.route";
import { ListIncomeSourceRoute } from "../api/express/routes/income_source/list.route";
import { UpdateIncomeSourceRoute } from "../api/express/routes/income_source/update.route";
import { IncomeSourceRespositoryPrisma } from "../repositories/income_source.repository.prisma";

const incomeSourceRespositoryPrisma = IncomeSourceRespositoryPrisma.build(prisma);

const createIncomeSourceService = CreateIncomeSourceUsecase.build(
    incomeSourceRespositoryPrisma,
);
const findIncomeSourceService = FindIncomeSourceUsecase.build(
    incomeSourceRespositoryPrisma,
);
const listIncomeSourceService = ListIncomeSourceUsecase.build(
    incomeSourceRespositoryPrisma,
);
const updateIncomeSourceService = UpdateIncomeSourceUsecase.build(
    incomeSourceRespositoryPrisma,
);
const deleteIncomeSourceService = DeleteIncomeSourceUsecase.build(
    incomeSourceRespositoryPrisma,
);

const createIncomeSourceRoute = CreateIncomeSourceRoute.build(createIncomeSourceService);
const findIncomeSourceRoute = FindIncomeSourceRoute.build(findIncomeSourceService);
const listIncomeSourceRoute = ListIncomeSourceRoute.build(listIncomeSourceService);
const updateIncomeSourceRoute = UpdateIncomeSourceRoute.build(updateIncomeSourceService);
const deleteIncomeSourceRoute = DeleteIncomeSourceRoute.build(deleteIncomeSourceService);

export const incomeSourceModule = [
    createIncomeSourceRoute,
    findIncomeSourceRoute,
    listIncomeSourceRoute,
    updateIncomeSourceRoute,
    deleteIncomeSourceRoute,
];
