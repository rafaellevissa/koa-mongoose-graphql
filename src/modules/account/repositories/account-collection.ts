import { Types } from "mongoose";
import Account from "../entity/account";
import { AccountModel, IAccount } from "../model/account";
import AccountRepository from "./account-repository";

class MongooseAccountCollection implements AccountRepository {
  async findAccountById(id: Types.ObjectId): Promise<Account | null> {
    return await AccountModel.findById(id);
  }

  async updateBalance(userId: Types.ObjectId, balance: number): Promise<void> {
    await AccountModel.updateOne({ userId }, { balance });
  }

  async findByUserId(userId: Types.ObjectId): Promise<Account | null> {
    return await AccountModel.findOne({ userId: userId });
  }

  async create(data: IAccount): Promise<Account> {
    const account = await AccountModel.create(data);
    await account.save();
    return account;
  }
}

export default MongooseAccountCollection;
