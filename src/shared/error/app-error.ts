import { Context } from "koa";

class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message = "Server internal", statusCode = 500) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

  public sendMessageErro(ctx: Context) {
    ctx.status = this.statusCode;
    ctx.body = {
      status: this.statusCode,
      message: this.message,
    };
  }
}

export default AppError;
