import { Types } from "mongoose";
import { IAccount } from "../modules/account/model/account";
import { IUser } from "../modules/user/model/user";
import { ITransaction } from "../modules/transaction/model/transaction";
import Account from "../modules/account/entity/account";
import Transaction from "../modules/transaction/entity/transaction";
import { makeUserService } from "../modules/user/factories/makeUserService";
import { makeAccountService } from "../modules/account/factories/makeAccounteService";
import { makeTransanctionService } from "../modules/transaction/factories/makeTransactionService";
import AuthService from "../modules/user/service/auth-service";
import MongooseUserCollection from "../modules/user/repositories/user-collection";
import isAuthenticated from "../http/middleware/isAuthenticated";

const userService = makeUserService();
const accountService = makeAccountService();
const transactionService = makeTransanctionService();

const userRepository = new MongooseUserCollection();
const authService = new AuthService(userRepository);

const resolvers = {
  Query: {
    async user(_: any, { id }: { id: Types.ObjectId }, context: any) {
      await isAuthenticated(context.token);
      return await userService.findUser(id);
    },

    async account(_: any, { id }: { id: Types.ObjectId }, context: any) {
      await isAuthenticated(context.token);
      return await accountService.getAccount(id);
    },

    async transactions(_: any, args: any, context: any) {
      await isAuthenticated(context.token);
      return await transactionService.fetch();
    },
  },

  Account: {
    async userId(account: Account, context: any) {
      return await userService.findUser(account.userId);
    },
  },

  Transaction: {
    async sender(transaction: Transaction) {
      return await userService.findUser(transaction.sender);
    },
    async receiver(transaction: Transaction) {
      return await userService.findUser(transaction.receiver);
    },
  },

  Mutation: {
    async createUser(_: any, { data }: { data: IUser }) {
      const { user, token } = await userService.createUser(data);
      const account = await accountService.create(user._id);
      return { user, account, token };
    },

    async addTransaction(
      _: any,
      { transaction }: { transaction: ITransaction },
      context: any
    ) {
      await isAuthenticated(context.token);
      return await transactionService.create(transaction);
    },

    async login(
      _: any,
      { login }: { login: { taxId: string; password: string } }
    ) {
      return await authService.login(login.taxId, login.password);
    },
  },
};

export { resolvers };
