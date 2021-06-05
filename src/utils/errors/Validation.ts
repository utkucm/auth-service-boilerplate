import { ValidationError } from 'joi';

import BaseError from './BaseError';
import errors from '../constants/error.constants';
import { HttpStatusCode } from '../../types';

type Response = { field: string; message: string };

class Validation extends BaseError {
  public err: ValidationError;
  public fields: string[] = [];
  public messages: string[] = [];
  public response: Response[] = [];

  constructor(err: ValidationError, message: string = errors.validation.message) {
    super(errors.validation.name, message, true, HttpStatusCode.BAD_REQUEST);

    this.err = err;
    this.serializeError();
  }

  serializeError() {
    let fields: string[] = [];
    let messages: string[] = [];
    let response: Response[] = [];
    this.err.details.forEach(error => {
      error.path.forEach(path => {
        if (typeof path === 'string') {
          fields.push(
            path.replace(/([A-Z])/g, ' $1').replace(/^./, function (str: string) {
              return str.toUpperCase();
            })
          );
        }
      });
    });

    this.err.details.map(err => messages.push(err.message.split(' ').slice(1).join(' ')));

    messages.forEach((msg: string, idx: number) => {
      let temp = msg;
      msg = `${fields[idx]} ${temp}.`;

      response.push({ field: fields[idx], message: msg });
    });

    this.fields = fields;
    this.messages = messages;
    this.response = response;
  }
}

export default Validation;
