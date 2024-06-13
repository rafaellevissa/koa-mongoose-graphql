import { Context, Next } from "koa";
import { ITransaction } from "../../../modules/transaction/model/transaction";
import TransactionService from "../../../modules/transaction/services/transaction-service";
import MongooseTransactionCollection from "../../../modules/transaction/repositories/transaction-collection";
import MongooseAccountCollection from "../../../modules/account/repositories/account-collection";

class TransactionController {
  async create(ctx: Context, next: Next) {
    const data = ctx.request.body as ITransaction;
    const transactionRepository = new MongooseTransactionCollection();
    const accountRepository = new MongooseAccountCollection();
    const transactionService = new TransactionService(
      transactionRepository,
      accountRepository
    );
    const transaction = await transactionService.create(data);

    ctx.status = 201;
    ctx.body = { transaction };

    await next();
  }
}

export default TransactionController;
