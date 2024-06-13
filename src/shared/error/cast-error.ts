import AppError from "./app-error";

export class CastError extends AppError {
  constructor(messageError = "Incorrect data") {
    super(messageError, 400);
  }
}
