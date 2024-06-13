import MongooseAccountCollection from "../../account/repositories/account-collection";
import MongooseTransactionCollection from "../repositories/transaction-collection";
import TransactionService from "../services/transaction-service";

export function makeTransanctionService(): TransactionService {
  const accountRepository = new MongooseAccountCollection();
  const transactionsRepository = new MongooseTransactionCollection();
  return new TransactionService(transactionsRepository, accountRepository);
}
