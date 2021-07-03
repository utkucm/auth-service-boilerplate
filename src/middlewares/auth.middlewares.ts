import { Request, Response, NextFunction } from 'express';

import { CreateError, logger } from '../utils';
import { TokenService, UserService } from '../services';
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
      logger.error(`Error occurred when validating forgot password body. ERROR: ${err}`);
      next(err);
    }
  }

  public static validateResetPassword(req: Request, _: Response, next: NextFunction) {
    try {
      logger.info('Validating reset password body.');
      const { error } = userValidation.resetPassword.body.validate(req.body, options);

      if (error) {
        return next(CreateError.ValidationError(error));
      }

      next();
    } catch (err) {
      logger.error(`Error occurred when validating reset password body. ERROR: ${err}`);
      next(err);
    }
  }

  public static async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = TokenService.getTokens(req);

      const { decodedAccessToken } = TokenService.verifyAccessToken(tokens.accessToken);

      if (decodedAccessToken === 'TokenExpiredError') {
        return next();
      }

      const user = await UserService.get({ _id: decodedAccessToken.id });

      if (!user) {
        return next(CreateError.UnauthorizedError('You need to log in.'));
      }

      res.locals.user = user;

      next();
    } catch (err) {
      logger.error(`Error occurred when validating reset password body. ERROR: ${err}`);
      next(err);
    }
  }
}

export default AuthMiddlewares;
