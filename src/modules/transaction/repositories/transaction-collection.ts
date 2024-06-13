import Transaction from "../entity/transaction";
import { ITransaction, TransactionModel } from "../model/transaction";
import TransactionRepository from "./transaction-repository";

class MongooseTransactionCollection implements TransactionRepository {
  async fetch(): Promise<Transaction[]> {
    return await TransactionModel.find();
  }

  async create(data: ITransaction): Promise<Transaction> {
    return await TransactionModel.create(data);
  }
}

export default MongooseTransactionCollection;
