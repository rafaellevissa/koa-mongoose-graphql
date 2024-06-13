import { Types } from "mongoose";
import { IUser } from "../model/user";
import UserRepository from "./user-repository";
import User from "../entity/user";
import { randomUUID } from "crypto";

class InMemoryUserRepository implements UserRepository {
  users: User[] = [];

  async create(data: IUser): Promise<User> {
    const user: User = {
      _id: new Types.ObjectId(),
      name: data.name,
      taxId: data.taxId,
      password: data.password,
    };

    this.users.push(user);

    return user;
  }

  async findUser(id: Types.ObjectId): Promise<User | null> {
    const user = this.users.find((user) => user._id === id);
    return user ? user : null;
  }

  async findUserByTaxId(taxId: string): Promise<User | null> {
    const user = this.users.find((user) => user.taxId === taxId);
    return user ? user : null;
  }
}

export default InMemoryUserRepository;
