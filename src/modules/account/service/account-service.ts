import { Types } from "mongoose";
import Account from "../entity/account";
import AccountRepository from "../repositories/account-repository";
import AppError from "../../../shared/error/app-error";

class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async create(userId: Types.ObjectId): Promise<Account> {
    return await this.accountRepository.create({
      balance: 0,
      userId,
      numberAccount: this.createAccountNumber(),
    });
  }

  async getAccount(id: Types.ObjectId): Promise<Account> {
    const account = await this.accountRepository.findAccountById(id);
    if (!account) throw new AppError("Account not found");

    return account;
  }

  async getAccountByUser(userId: Types.ObjectId): Promise<Account> {
    const account = await this.accountRepository.findByUserId(userId);
    if (!account) {
      throw new AppError("Account not found");
    }

    return account;
  }

  private createAccountNumber(): string {
    const digitNumber = 10;
    let numberAccount = "";

    for (let i = 0; i < digitNumber; i++) {
      const digit = Math.floor(Math.random() * 10);
      numberAccount += digit.toString();
    }

    return numberAccount;
  }
}

export default AccountService;
