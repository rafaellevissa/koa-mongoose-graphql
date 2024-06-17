import { Types } from "mongoose";
import Transaction from "../entity/transaction";
import { ITransaction } from "../model/transaction";
import TransactionRepository from "./transaction-repository";

class TransactionInMemory implements TransactionRepository {
  transactions: Transaction[] = [];

  async create(data: ITransaction): Promise<Transaction> {
    const transaction = {
      _id: new Types.ObjectId(),
      ...data,
    };
    this.transactions.push(transaction);

    return transaction;
  }

  async fetch(): Promise<Transaction[]> {
    return this.transactions.map((transaction) => {
      return transaction;
    });
  }

  async findTransactionsBySender(
    senderId: Types.ObjectId
  ): Promise<Transaction[]> {
    return this.transactions.filter((sender) => sender.sender === senderId);
  }

  async findTransactionsByReceiver(
    receiverId: Types.ObjectId
  ): Promise<Transaction[]> {
    return this.transactions.filter(
      (receiver) => receiver.receiver === receiverId
    );
  }
}

export default TransactionInMemory;
