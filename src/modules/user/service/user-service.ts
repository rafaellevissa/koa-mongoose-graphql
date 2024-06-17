import { Types } from "mongoose";
import User from "../entity/user";
import { IUser } from "../model/user";
import UserRepository from "../repositories/user-repository";
import AppError from "../../../shared/error/app-error";
import { sign } from "jsonwebtoken";
import { config } from "../../../config/config";

class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser({
    name,
    password,
    taxId,
  }: IUser): Promise<{ user: User } & { token: string }> {
    const user = await this.userRepository.create({
      name,
      taxId,
      password,
    });

    const token = sign({}, config.auth.secret!, {
      subject: user.taxId,
      expiresIn: config.auth.expiresIn,
    });

    return { user, token };
  }

  async findUserByTaxId(taxId: string): Promise<User> {
    const user = await this.userRepository.findUserByTaxId(taxId);
    if (!user) {
      throw new AppError("User not found");
    }
    return user;
  }

  async findUser(id: Types.ObjectId): Promise<User> {
    const user = await this.userRepository.findUser(id);

    if (!user) throw new AppError("User not found");

    return user;
  }
}

export default UserService;
