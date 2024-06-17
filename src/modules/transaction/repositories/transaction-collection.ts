import { Types } from "mongoose";
import Transaction from "../entity/transaction";
import { ITransaction, TransactionModel } from "../model/transaction";
import TransactionRepository from "./transaction-repository";

class MongooseTransactionCollection implements TransactionRepository {
  async findTransactionsByReceiver(
    receiverId: Types.ObjectId
  ): Promise<Transaction[]> {
    return await TransactionModel.find({ receiver: receiverId });
  }
  async findTransactionsBySender(
    senderId: Types.ObjectId
  ): Promise<Transaction[]> {
    return await TransactionModel.find({ sender: senderId });
  }

  async fetch(): Promise<Transaction[]> {
    return await TransactionModel.find();
  }

  async create(data: ITransaction): Promise<Transaction> {
    return await TransactionModel.create(data);
  }
}

export default MongooseTransactionCollection;
