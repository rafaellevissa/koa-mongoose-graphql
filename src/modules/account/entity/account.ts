import { Types } from "mongoose";

class Account {
  _id: Types.ObjectId;
  numberAccount: string;
  userId: Types.ObjectId;
  balance: number;
}

export default Account;
