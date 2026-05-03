import { ApiExpress } from "./infra/api/express/api.express";
import { authModule } from "./infra/modules/auth.module";
import { userModule } from "./infra/modules/user.module";

function main() {
    const api = ApiExpress.build([...userModule, ...authModule]);

    api.start(3333);
}

main();
