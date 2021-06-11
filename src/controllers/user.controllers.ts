import { Request, Response, NextFunction } from 'express';

import { TokenService, UserService, ResponseService } from '../services';
import { CreateError } from '../utils';

class UserController {
  public static async register(_: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = res.locals.data;

      const user = await UserService.create({ username, email, password });

      ResponseService.sendRegister(res, TokenService.signTokens(user));
    } catch (err) {
      return next(err);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserService.get({ email });

      if (!user.verifyPassword(user.password, password)) {
        return next(CreateError.UnauthorizedError('Email or password is incorrect.'));
      }

      ResponseService.sendLogin(res, TokenService.signTokens(user));
    } catch (err) {
      return next(err);
    }
  }
}

export default UserController;
