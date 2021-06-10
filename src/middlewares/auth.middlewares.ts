import { Request, Response, NextFunction } from 'express';
import { CreateError, logger } from '../utils';

import { userValidation } from '../validations';

const options = {
  abortEarly: false,
};

class AuthMiddlewares {
  public static validateRegister(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Validating register body.');
      const { error, value } = userValidation.create.body.validate(req.body, options);

      if (error) {
        return next(CreateError.ValidationError(error));
      }

      res.locals.data = value;
      return next();
    } catch (err) {
      logger.error(`Error occurred when validating register body. ERROR: ${err}`);
      next(err);
    }
  }

  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Validating login body.');
      const { error, value } = userValidation.login.body.validate(req.body, options);

      if (error) {
        return next(CreateError.ValidationError(error));
      }

      res.locals.data = value;
      return next();
    } catch (err) {
      logger.error(`Error occurred when validating login body. ERROR: ${err}`);
      next(err);
    }
  }
}

export default AuthMiddlewares;
