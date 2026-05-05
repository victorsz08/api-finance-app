import { ApiExpress } from "./infra/api/express/api.express";
import { authModule } from "./infra/modules/auth.module";
import { categoryModule } from "./infra/modules/category.module";
import { userModule } from "./infra/modules/user.module";

function main() {
    const api = ApiExpress.build([...userModule, ...authModule, ...categoryModule]);

    api.start(3333);
}

main();
