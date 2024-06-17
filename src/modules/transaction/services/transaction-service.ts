import { Types } from "mongoose";
import AppError from "../../../shared/error/app-error";
import AccountRepository from "../../account/repositories/account-repository";
import Transaction from "../entity/transaction";
import { ITransaction } from "../model/transaction";
import TransactionRepository from "../repositories/transaction-repository";

class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository
  ) {}

  async create({
    receiver,
    sender,
    value,
  }: ITransaction): Promise<Transaction> {
    if (value <= 0) throw new AppError("value is necessary");

    const userReceiver = await this.accountRepository.findByUserId(receiver);
    if (!userReceiver) throw new AppError("Account not found");

    const userSender = await this.accountRepository.findByUserId(sender);
    if (!userSender) throw new AppError("Account not found");

    if (value > userSender.balance) throw new AppError("insufficient balance");

    userSender.balance = userSender.balance - value;
    await this.accountRepository.updateBalance(
      userSender.userId,
      userSender.balance
    );

    userReceiver.balance = userReceiver.balance + value;
    await this.accountRepository.updateBalance(
      userReceiver.userId,
      userReceiver.balance
    );
    return await this.transactionRepository.create({ receiver, sender, value });
  }

  async fetch(): Promise<Transaction[]> {
    return await this.transactionRepository.fetch();
  }

  async findTransactionsBySender(
    senderId: Types.ObjectId
  ): Promise<Transaction[]> {
    return await this.transactionRepository.findTransactionsBySender(senderId);
  }

  async findTransactionsByReceiver(
    receiverId: Types.ObjectId
  ): Promise<Transaction[]> {
    return await this.transactionRepository.findTransactionsByReceiver(
      receiverId
    );
  }
}

export default TransactionService;
