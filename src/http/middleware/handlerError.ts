import { Context, Next } from "koa";
import { Error } from "mongoose";
import { CastError } from "../../shared/error/cast-error";
import { ValidationError } from "../../shared/error/validation-error";
import AppError from "../../shared/error/app-error";

export async function handlerError(ctx: Context, next: Next) {
  try {
    next();
  } catch (error) {
    console.log("aqui");
    console.log("aqui2", error as Error);
    await errors(ctx, error as Error);
    ctx.app.emit("error", error, ctx);
  }
}

async function errors(ctx: Context, error: Error) {
  console.log("function errro", error.name);
  if (error instanceof Error.CastError) {
    new CastError().sendMessageErro(ctx);
  } else if (error instanceof Error.ValidationError) {
    new ValidationError(error).sendMessageErro(ctx);
  } else if (error instanceof AppError) {
    error.sendMessageErro(ctx);
  } else {
    new AppError().sendMessageErro(ctx);
  }
}
