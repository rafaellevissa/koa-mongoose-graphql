import { Context, Next } from "koa";

export async function decodeToken(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    ctx.state.token = authHeader.substring(7, authHeader.length); // Extrai o token sem "Bearer "
  } else {
    ctx.state.token = null;
  }
  await next();
}
