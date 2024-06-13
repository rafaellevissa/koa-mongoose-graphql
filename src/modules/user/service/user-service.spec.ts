import { Types } from "mongoose";
import AppError from "../../../shared/error/app-error";
import InMemoryUserRepository from "../repositories/user-inMemory";
import UserService from "./user-service";

describe("User-service", () => {
  let userInMemoryRepository: InMemoryUserRepository;
  let userService: UserService;

  const data = {
    name: "User name",
    taxId: "12345678912",
    password: "123456",
  };
  userInMemoryRepository = new InMemoryUserRepository();
  userService = new UserService(userInMemoryRepository);

  test("Should create a user", async () => {
    const { user, token } = await userService.createUser(data);
    expect(user.name).toBe("User name");
    expect(user.taxId).toBe("12345678912");
    expect(typeof user.password).toBe("string");
    expect(typeof user.password).toBe("string");
    expect(typeof token).toBe("string");
  });

  test("Should return a user by id", async () => {
    const { user } = await userService.createUser(data);
    const finderUser = await userService.findUser(user._id);
    expect(finderUser.name).toBe("User name");
    expect(finderUser.taxId).toBe("12345678912");
    expect(typeof finderUser.password).toBe("string");
  });

  test("Should throw an error when user not found by id", async () => {
    const nonExistentUserId = new Types.ObjectId();
    await expect(userService.findUser(nonExistentUserId)).rejects.toThrow(
      AppError
    );
    await expect(userService.findUser(nonExistentUserId)).rejects.toThrow(
      "User not found"
    );
  });
});
