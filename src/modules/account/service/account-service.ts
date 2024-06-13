import { Types } from "mongoose";
import Account from "../entity/account";
import { IAccount } from "../model/account";
import AccountRepository from "../repositories/account-repository";
import AppError from "../../../shared/error/app-error";

class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async create(data: IAccount): Promise<Account> {
    return await this.accountRepository.create(data);
  }

  async getAccount(id: Types.ObjectId): Promise<Account> {
    const account = await this.accountRepository.findAccountById(id);
    if (!account) throw new AppError("Account not found");

    return account;
  }
}

export default AccountService;
