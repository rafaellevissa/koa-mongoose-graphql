import { Types } from "mongoose";

class User {
  _id: Types.ObjectId;
  name: string;
  taxId: string;
  password: string;
}

export default User;
