import { Types } from "mongoose";
import Account from "../entity/account";
import { IAccount } from "../model/account";
import AccountRepository from "./account-repository";

class AccountInMemoryRepository implements AccountRepository {
  accounts: Account[] = [];

  async findAccountById(id: Types.ObjectId): Promise<Account | null> {
    const account = this.accounts.find((account) => account._id === id);
    return account ? account : null;
  }

  async findByUserId(userId: Types.ObjectId): Promise<Account | null> {
    const account = this.accounts.find((account) => account.userId === userId);
    return account ? account : null;
  }

  async updateBalance(userId: Types.ObjectId, balance: number): Promise<void> {
    const account = await this.findByUserId(userId);
    if (account) {
      account.balance = balance;
    } else {
      throw new Error("Account not found");
    }
  }

  async create(data: IAccount): Promise<Account> {
    const account = {
      _id: new Types.ObjectId(),
      numberAccount: data.numberAccount,
      userId: data.userId,
      balance: data.balance,
    };

    this.accounts.push(account);

    return account;
  }
}

export default AccountInMemoryRepository;
