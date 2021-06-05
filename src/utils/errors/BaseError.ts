import { HttpStatusCode } from '../../types';

class BaseError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean;
  public readonly statusCode: HttpStatusCode;

  constructor(name: string, message: string, isOperational: boolean, statusCode: HttpStatusCode) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.isOperational = isOperational;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

export default BaseError;
