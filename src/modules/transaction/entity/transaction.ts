import { Types } from "mongoose";

class Transaction {
  _id: Types.ObjectId;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  value: number;
}

export default Transaction;
