import { Types } from "mongoose";
import Account from "../entity/account";
import { IAccount } from "../model/account";

interface AccountRepository {
  create(data: IAccount): Promise<Account>;
  findByUserId(userId: Types.ObjectId): Promise<Account | null>;
  findAccountById(id: Types.ObjectId): Promise<Account | null>;
  updateBalance(userId: Types.ObjectId, balance: number): Promise<void>;
}

export default AccountRepository;
