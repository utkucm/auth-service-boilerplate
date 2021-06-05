import BaseError from './BaseError';
import errors from '../constants/error.constants';
import { HttpStatusCode } from '../../types';

class InternalServer extends BaseError {
  constructor(message: string = errors.internalServer.message) {
    super(errors.internalServer.name, message, true, HttpStatusCode.BAD_REQUEST);
  }
}

export default InternalServer;
