import BadRequest from './BadRequest';
import NotFound from './NotFound';
import Unauthorized from './Unauthorized';
import InternalServer from './InternalServer';
import BaseError, { HttpStatusCode } from './BaseError';

class CreateError {
  public static BadRequestError = (message: string = 'Invalid Request.'): BaseError => {
    return new BadRequest(message);
  };

  public static UnauthorizedError = (
    name: string = 'Unauthorized Error',
    message: string = 'You are unauthorized.',
    isOperational: boolean = true,
    statusCode: HttpStatusCode = HttpStatusCode.UNAUTHORIZED
  ): BaseError => {
    return new BaseError(name, message, isOperational, statusCode);
  };

  public static NotFoundError = (
    name: string = 'Not Found Error',
    message: string = 'Not found.',
    isOperational: boolean = true,
    statusCode: HttpStatusCode = HttpStatusCode.NOT_FOUND
  ): BaseError => {
    return new BaseError(name, message, isOperational, statusCode);
  };

  public static InternalServerError = (
    name: string = 'Internal Server Error',
    message: string = 'Something went wrong.',
    isOperational: boolean = false,
    statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER
  ): BaseError => {
    return new BaseError(name, message, isOperational, statusCode);
  };
}

export default CreateError;
