import Router from "koa-router";
import TransactionController from "../controller/transaction/transaction-controller";

const transactionController = new TransactionController();
const transactionRoutes = new Router();

transactionRoutes.post("/transaction", transactionController.create);

export { transactionRoutes };
