import BaseError from './BaseError';
import errors from '../constants/error.constants';
import { HttpStatusCode } from '../../types';

class Unauthorized extends BaseError {
  constructor(message: string = errors.unauthorized.message) {
    super(errors.unauthorized.name, message, true, HttpStatusCode.NOT_FOUND);
  }
}

export default Unauthorized;
