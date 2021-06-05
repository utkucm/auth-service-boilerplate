import { ValidationError } from 'joi';

import BadRequest from './BadRequest';
import NotFound from './NotFound';
import Unauthorized from './Unauthorized';
import InternalServer from './InternalServer';
import Validation from './Validation';

class CreateError {
  public static BadRequestError = (message?: string): BadRequest => {
    return new BadRequest(message);
  };

  public static UnauthorizedError = (message?: string): Unauthorized => {
    return new Unauthorized(message);
  };

  public static NotFoundError = (message?: string): NotFound => {
    return new NotFound(message);
  };

  public static InternalServerError = (message?: string): InternalServer => {
    return new InternalServer(message);
  };

  public static ValidationError = (err: ValidationError, message?: string): Validation => {
    return new Validation(err, message);
  };
}

export default CreateError;
