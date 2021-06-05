import BaseError, { HttpStatusCode } from './BaseError';
import errors from '../constants/error.constants';

class InternalServer extends BaseError {
  constructor(message: string = errors.internalServer.message) {
    super(errors.internalServer.name, message, true, HttpStatusCode.BAD_REQUEST);
  }
}

export default InternalServer;
