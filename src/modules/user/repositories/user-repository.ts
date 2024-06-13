import { Types } from "mongoose";
import { IUser } from "../model/user";
import User from "../entity/user";

interface UserRepository {
  create(data: IUser): Promise<User>;
  findUser(id: Types.ObjectId): Promise<User | null>;
  findUserByTaxId(taxId: string): Promise<User | null>;
}

export default UserRepository;
