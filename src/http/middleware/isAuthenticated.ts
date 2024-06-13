import AppError from "../../shared/error/app-error";
import { verify } from "jsonwebtoken";
import { config } from "../../config/config";
import MongooseUserCollection from "../../modules/user/repositories/user-collection";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
const userRepository = new MongooseUserCollection();

async function isAuthenticated(token: string) {
  try {
    const payload = verify(token, config.auth.secret!);
    const { sub } = payload as ITokenPayload;
    const user = await userRepository.findUserByTaxId(sub);
    if (!user) throw new AppError("User not found");
    return user._id;
  } catch (error) {
    throw new AppError("Invalid token");
  }
}

export default isAuthenticated;
