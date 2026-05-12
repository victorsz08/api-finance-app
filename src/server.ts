import { ApiExpress } from "./infra/api/express/api.express";
import { authModule } from "./infra/modules/auth.module";
import { categoryModule } from "./infra/modules/category.module";
import { fixedExpenseModule } from "./infra/modules/fixed_expense.module";
import { userModule } from "./infra/modules/user.module";

function main() {
    const api = ApiExpress.build([
        ...userModule,
        ...authModule,
        ...categoryModule,
        ...fixedExpenseModule,
    ]);

    api.start(3333);
}

main();
