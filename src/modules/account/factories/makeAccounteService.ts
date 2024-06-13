import MongooseAccountCollection from "../repositories/account-collection";
import AccountService from "../service/account-service";

export function makeAccountService(): AccountService {
  const accountRepository = new MongooseAccountCollection();
  return new AccountService(accountRepository);
}
