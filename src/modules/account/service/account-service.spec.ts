import { Types } from "mongoose";
import AccountInMemoryRepository from "../repositories/account-inMemory";
import AccountService from "./account-service";
import AppError from "../../../shared/error/app-error";

describe("Account Service", () => {
  let accountRepository: AccountInMemoryRepository;
  let accountService: AccountService;
  let userId = new Types.ObjectId();

  beforeAll(() => {
    accountRepository = new AccountInMemoryRepository();
    accountService = new AccountService(accountRepository);
  });

  test("Should create a account", async () => {
    const account = await accountService.create(userId);
    expect(account.userId).toBe(userId);
    expect(account.balance).toBe(0);
  });

  test("Should return a accounte by id", async () => {
    const account = await accountService.create(userId);
    const finderAccount = await accountService.getAccount(account._id);
    expect(finderAccount._id).toEqual(account._id);
    expect(finderAccount.userId).toEqual(account.userId);
    expect(finderAccount.balance).toEqual(account.balance);
    expect(finderAccount.numberAccount).toEqual(account.numberAccount);
  });

  test("should throw an error when the account is not found", async () => {
    const accountId = new Types.ObjectId();
    await expect(accountService.getAccount(accountId)).rejects.toThrow(
      AppError
    );
    await expect(accountService.getAccount(accountId)).rejects.toThrow(
      "Account not found"
    );
  });
});
