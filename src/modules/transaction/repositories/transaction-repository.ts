import Transaction from "../entity/transaction";
import { ITransaction } from "../model/transaction";

interface TransactionRepository {
  create(data: ITransaction): Promise<Transaction>;
  fetch(): Promise<Transaction[]>;
}

export default TransactionRepository;
