import { Request, Response, NextFunction } from 'express';

import { UserService } from '../services';
import { CreateError } from '../utils';

class UserController {
  public static async register(_: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = res.locals.data;

      const newUser = await UserService.create({ username, email, password });

      return res.status(201).json({
        success: true,
        payload: newUser,
      });
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

      return res.status(201).json({
        success: true,
        payload: user,
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default UserController;
