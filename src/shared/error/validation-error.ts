import mongoose from "mongoose";
import { CastError } from "./cast-error";

export class ValidationError extends CastError {
  constructor(erro: mongoose.Error.ValidationError) {
    const messageError = Object.values(erro.errors)
      .map((err) => err.message)
      .join("; ");
    super(`That error was found: ${messageError}`);
  }
}
