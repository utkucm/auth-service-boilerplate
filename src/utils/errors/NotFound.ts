import BaseError from './BaseError';
import errors from '../constants/error.constants';
import { HttpStatusCode } from '../../types';

class NotFound extends BaseError {
  constructor(message: string = errors.notFound.message) {
    super(errors.notFound.name, message, true, HttpStatusCode.NOT_FOUND);
  }
}

export default NotFound;
