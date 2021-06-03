import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _: Request, res: Response, __: NextFunction) => {
  if (err.isOperational) {
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
