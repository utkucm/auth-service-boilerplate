import BaseError from './BaseError';
import errors from '../constants/error.constants';
import { HttpStatusCode } from '../../types';

class BadRequest extends BaseError {
  constructor(message: string = errors.validation.message) {
    super(errors.validation.name, message, true, HttpStatusCode.BAD_REQUEST);
  }
}

export default BadRequest;
