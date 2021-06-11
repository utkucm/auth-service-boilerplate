import { Request, Response, NextFunction } from 'express';
import { CreateError, logger } from '../utils';

import { userValidation } from '../validations';

const options = {
  abortEarly: false,
};

class AuthMiddlewares {
  public static validateRegister(req: Request, _: Response, next: NextFunction) {
    try {
      logger.info('Validating register body.');
      const { error } = userValidation.create.body.validate(req.body, options);

      if (error) {
        return next(CreateError.ValidationError(error));
      }

      next();
    } catch (err) {
      logger.error(`Error occurred when validating register body. ERROR: ${err}`);
      next(err);
    }
  }

  public static validateLogin(req: Request, _: Response, next: NextFunction) {
    try {
      logger.info('Validating login body.');
      const { error } = userValidation.login.body.validate(req.body, options);

      if (error) {
        return next(CreateError.ValidationError(error));
      }

      next();
    } catch (err) {
      logger.error(`Error occurred when validating login body. ERROR: ${err}`);
      next(err);
    }
  }

  public static validateForgotPassword(req: Request, _: Response, next: NextFunction) {
    try {
      logger.info('Validating forgot password body.');
      const { error } = userValidation.forgotPassword.body.validate(req.body, options);

      if (error) {
        return next(CreateError.ValidationError(error));
      }

      next();
    } catch (err) {
      logger.error(`Error occurred when validating login body. ERROR: ${err}`);
      next(err);
    }
  }
}

export default AuthMiddlewares;
