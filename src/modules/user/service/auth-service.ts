import { UserModel } from "../model/user";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../../../config/config";
import UserRepository from "../repositories/user-repository";

class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(taxId: string, password: string) {
    const user = await this.userRepository.findUserByTaxId(taxId);

    if (!user) throw new Error("not authorized");

    const passwordConfirmed = bcrypt.compare(password, user.password);
    if (!passwordConfirmed) throw new Error("not authorized");

    const token = sign({}, config.auth.secret!, {
      subject: user.taxId,
      expiresIn: config.auth.expiresIn,
    });

    return { user, token };
  }
}

export default AuthService;
