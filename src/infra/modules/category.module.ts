import { prisma } from "../../packages/db";
import { CreateCategoryUsecase } from "../../usecase/category/create";
import { DeleteCategoryUsecase } from "../../usecase/category/delete";
import { FindCategoryUsecase } from "../../usecase/category/find";
import { ListCategoryUsecase } from "../../usecase/category/list";
import { UpdateCategoryUsecase } from "../../usecase/category/update";
import { CreateCategoryRoute } from "../api/express/routes/category/create.route";
import { DeleteCategoryRoute } from "../api/express/routes/category/delete.route";
import { FindCategoryRoute } from "../api/express/routes/category/find.route";
import { ListCategoryRoute } from "../api/express/routes/category/list.route";
import { UpdateCategoryRoute } from "../api/express/routes/category/update";
import { CategoryRepositoryPrisma } from "../repositories/category.repository.prisma";

const categoryRepository = CategoryRepositoryPrisma.build(prisma);

const createCategoryService = CreateCategoryUsecase.build(categoryRepository);
const findCategoryService = FindCategoryUsecase.build(categoryRepository);
const listCategoryService = ListCategoryUsecase.build(categoryRepository);
const updateCategoryService = UpdateCategoryUsecase.build(categoryRepository);
const deleteCategoryService = DeleteCategoryUsecase.build(categoryRepository);

const createCategoryRoute = CreateCategoryRoute.build(createCategoryService);
const findCategoryRoute = FindCategoryRoute.build(findCategoryService);
const listCategoryRoute = ListCategoryRoute.build(listCategoryService);
const updateCategoryRoute = UpdateCategoryRoute.build(updateCategoryService);
const deleteCategoryRoute = DeleteCategoryRoute.build(deleteCategoryService);

export const categoryModule = [
    createCategoryRoute,
    findCategoryRoute,
    listCategoryRoute,
    updateCategoryRoute,
    deleteCategoryRoute,
];
