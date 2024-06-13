import { Types } from "mongoose";
import User from "../entity/user";
import { IUser } from "../model/user";
import UserRepository from "../repositories/user-repository";
import AppError from "../../../shared/error/app-error";

class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser({ name, password, taxId }: IUser): Promise<User> {
    return await this.userRepository.create({
      name,
      taxId,
      password,
    });
  }

  async findUser(id: Types.ObjectId): Promise<User> {
    const user = await this.userRepository.findUser(id);

    if (!user) throw new AppError("User not found");

    return user;
  }
}

export default UserService;
