import Router from "koa-router";
import AccountController from "../../controller/account/accounte-controller";

const accountController = new AccountController();
const accountRoutes = new Router();

accountRoutes.post("/account", accountController.create);

export { accountRoutes };
