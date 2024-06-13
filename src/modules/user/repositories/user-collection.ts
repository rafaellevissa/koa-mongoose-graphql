import { Types } from "mongoose";
import { IUser, UserModel } from "../model/user";
import UserRepository from "./user-repository";
import User from "../entity/user";

class MongooseUserCollection implements UserRepository {
  async findUser(id: Types.ObjectId): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async findUserByTaxId(taxId: string): Promise<User | null> {
    return await UserModel.findOne({ taxId });
  }

  async create({ name, taxId, password }: IUser): Promise<User> {
    const user = await UserModel.create({ name, taxId, password });
    await user.save();

    return user;
  }
}

export default MongooseUserCollection;
