import { Context, Next } from "koa";
import { IUser, UserModel } from "../../../modules/user/model/user";
import UserService from "../../../modules/user/service/user-service";
import AuthService from "../../../modules/user/service/auth-service";
import MongooseUserCollection from "../../../modules/user/repositories/user-collection";

type Login = {
  taxId: string;
  password: string;
};

class UserController {
  async create(ctx: Context, next: Next) {
    const data = ctx.request.body as IUser;
    const userRepository = new MongooseUserCollection();
    const userService = new UserService(userRepository);
    const user = await userService.createUser(data);
    ctx.status = 201;
    ctx.body = { user };

    await next();
  }

  async fetch(ctx: Context, next: Next) {
    try {
      const user = await UserModel.find();

      ctx.status = 200;
      ctx.body = { res: user };

      await next();
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  async login(ctx: Context, next: Next) {
    try {
      const data = ctx.request.body as Login;
      const authService = new AuthService();
      const { user, token } = await authService.login(
        data.taxId,
        data.password
      );

      ctx.body = { user, token };

      await next();
    } catch (error) {
      console.log((error as Error).message);
    }
  }
}

export default UserController;
