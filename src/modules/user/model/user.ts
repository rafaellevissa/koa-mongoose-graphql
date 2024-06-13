import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  taxId: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, minlength: 8 },
  taxId: { type: String, required: true, unique: true, minlength: 11 },
  password: { type: String, required: true, minlength: 6 },
});

userSchema.pre<IUser>("save", async function () {
  const hashPasword = await bcrypt.hash(this.password, 12);
  this.password = hashPasword;
});

export const UserModel = model<IUser>("User", userSchema);
