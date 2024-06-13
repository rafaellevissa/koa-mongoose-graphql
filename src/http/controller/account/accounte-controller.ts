import { Context, Next } from "koa";
import AccountService from "../../../modules/account/service/account-service";
import { IAccount } from "../../../modules/account/model/account";
import MongooseUserCollection from "../../../modules/user/repositories/user-collection";
import MongooseAccountCollection from "../../../modules/account/repositories/account-collection";

class AccountController {
  async create(ctx: Context, next: Next) {
    try {
      const data = ctx.request.body as IAccount;
      const userRepository = new MongooseUserCollection();
      const accountRepository = new MongooseAccountCollection();
      const accountService = new AccountService(accountRepository);
      const account = await accountService.create(data);

      ctx.status = 201;
      ctx.body = { account };

      await next();
    } catch (error) {
      console.log((error as Error).message);
    }
  }
}

export default AccountController;
