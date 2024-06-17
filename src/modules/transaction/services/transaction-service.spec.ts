import { Types } from "mongoose";
import AccountInMemoryRepository from "../../account/repositories/account-inMemory";
import TransactionInMemory from "../repositories/transaction-inMemory";
import TransactionService from "./transaction-service";
import InMemoryUserRepository from "../../user/repositories/user-inMemory";
import { IUser } from "../../user/model/user";
import User from "../../user/entity/user";
import { ITransaction } from "../model/transaction";
import { IAccount } from "../../account/model/account";
import Account from "../../account/entity/account";
import AppError from "../../../shared/error/app-error";

describe("Transaction Service", () => {
  const userData1: IUser = {
    name: "User name",
    taxId: "12345678912",
    password: "123456",
  };
  const userData2: IUser = {
    name: "Other name",
    taxId: "12345678921",
    password: "123456",
  };

  let data: ITransaction;
  let sender: User;
  let receiver: User;
  let accountData1: IAccount;
  let accountData2: IAccount;
  let account1: Account;
  let account2: Account;

  let userInMemoryRepository: InMemoryUserRepository;
  let accountInMemoryRepository: AccountInMemoryRepository;
  let transactionInMemoryRepository: TransactionInMemory;

  let transactionService: TransactionService;

  beforeAll(async () => {
    userInMemoryRepository = new InMemoryUserRepository();
    sender = await userInMemoryRepository.create(userData1);
    receiver = await userInMemoryRepository.create(userData2);

    accountData1 = {
      numberAccount: "333222322",
      userId: sender._id,
      balance: 1000,
    };

    accountData2 = {
      numberAccount: "333222322",
      userId: receiver._id,
      balance: 0,
    };

    accountInMemoryRepository = new AccountInMemoryRepository();
    account1 = await accountInMemoryRepository.create(accountData1);
    account2 = await accountInMemoryRepository.create(accountData2);

    transactionInMemoryRepository = new TransactionInMemory();

    transactionService = new TransactionService(
      transactionInMemoryRepository,
      accountInMemoryRepository
    );

    data = {
      sender: account1.userId,
      receiver: account2.userId,
      value: 500,
    };
  });

  test("should create a transaction", async () => {
    const transaction = await transactionService.create(data);

    expect(transaction.receiver).toBe(data.receiver);
    expect(transaction.sender).toBe(data.sender);
    expect(transaction.value).toBe(500);
  });

  test("Should fetch all users", async () => {
    const users = await transactionService.fetch();
    expect(users.length).toBe(1);
  });

  test("Should retur a transactions collections by sender Id", async () => {
    const transactions = await transactionService.findTransactionsBySender(
      sender._id
    );
    expect(transactions.length).toBe(1);
  });

  test("Should retur a transactions collections by receiver Id", async () => {
    const transactions = await transactionService.findTransactionsByReceiver(
      receiver._id
    );
    expect(transactions.length).toBe(1);
  });
});
