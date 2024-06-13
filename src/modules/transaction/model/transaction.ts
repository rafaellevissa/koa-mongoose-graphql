import { Schema, Types, model } from "mongoose";

export interface ITransaction {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  value: number;
}

const transactionSchema = new Schema<ITransaction>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  value: { type: Number, required: true },
});

export const TransactionModel = model<ITransaction>(
  "Transaction",
  transactionSchema
);
