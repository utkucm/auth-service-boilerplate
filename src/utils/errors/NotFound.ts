import BaseError, { HttpStatusCode } from './BaseError';
import errors from '../constants/error.constants';

class NotFound extends BaseError {
  constructor(message: string = errors.notFound.message) {
    super(errors.notFound.name, message, true, HttpStatusCode.NOT_FOUND);
  }
}

export default NotFound;
