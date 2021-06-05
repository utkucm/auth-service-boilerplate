import { Request, Response, NextFunction } from 'express';
import Validation from '../utils/errors/Validation';
import BaseError from '../utils/errors/BaseError';

const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof Validation) {
    return res.status(err.statusCode).json({
      success: false,
      payload: {
        errors: err.response,
      },
    });
  }

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      payload: {
        error: {
          name: err.name,
          message: err.message,
        },
      },
    });
  }

  return res.status(500).json({
    success: false,
    payload: {
      error: {
        name: 'Internal Server Error',
        message: 'Something went wrong!',
      },
    },
  });
};

export default errorHandler;
