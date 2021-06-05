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
      return next(CreateError.InternalServerError('Error occurred when creating new user.'));
    }
  }
}

export default UserController;
