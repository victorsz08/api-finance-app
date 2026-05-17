import { ApiExpress } from "./infra/api/express/api.express";
import { AuthModule } from "./infra/modules/auth.module";
import { CategoryModule } from "./infra/modules/category.module";
import { FixedExpenseModule } from "./infra/modules/fixed_expense.module";
import { IncomeSourceModule } from "./infra/modules/income_source.module";
import { OneTimeExpenseModule } from "./infra/modules/one_time_expense.module";
import { userModule } from "./infra/modules/user.module";

function main() {
    const api = ApiExpress.build([
        ...userModule,
        ...AuthModule,
        ...CategoryModule,
        ...FixedExpenseModule,
        ...IncomeSourceModule,
        ...OneTimeExpenseModule,
    ]);

    api.start(3333);
}

main();
