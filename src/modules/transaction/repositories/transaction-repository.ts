import { Types } from "mongoose";
import Transaction from "../entity/transaction";
import { ITransaction } from "../model/transaction";

interface TransactionRepository {
  create(data: ITransaction): Promise<Transaction>;
  fetch(): Promise<Transaction[]>;
  findTransactionsBySender(senderId: Types.ObjectId): Promise<Transaction[]>;
  findTransactionsByReceiver(
    receiverId: Types.ObjectId
  ): Promise<Transaction[]>;
}

export default TransactionRepository;
