import { Schema, Types, model } from "mongoose";

export interface IAccount {
  numberAccount: string;
  userId: Types.ObjectId;
  balance: number;
}

const accountSchema = new Schema<IAccount>({
  numberAccount: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  balance: { type: Number },
});

export const AccountModel = model<IAccount>("Account", accountSchema);
