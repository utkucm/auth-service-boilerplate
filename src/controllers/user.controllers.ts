import { Request, Response, NextFunction } from 'express';

import { TokenService, UserService, ResponseService, PasswordService } from '../services';
import { CreateError } from '../utils';

class UserController {
  public static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;

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

  public static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await UserService.get({ email });

      if (!user) {
        return ResponseService.sendForgotPassword(res);
      }

      const resetPasswordURL = await PasswordService.generatePasswordReset(req, user);

      // await MailService.sendForgotPassword(resetPasswordURL, user);

      ResponseService.sendForgotPassword(res, resetPasswordURL);
    } catch (err) {
      return next(err);
    }
  }

  public static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { resetPasswordToken } = req.params;
      const { password } = req.body;

      const user = await UserService.get({ resetPasswordToken, resetPasswordTokenExpires: { $gt: Date.now() } });

      if (!user) {
        return next(CreateError.NotFoundError('Password change has been expired.'));
      }

      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordTokenExpires = null;
      user.passwordChangedAt = Date.now();
      await user.save();

      // await MailService.sendForgotPassword(resetPasswordURL, user);

      ResponseService.sendResetPassword(res);
    } catch (err) {
      return next(err);
    }
  }

  public static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const tokensFromClient = TokenService.getTokens(req);

      const { decodedRefreshToken } = TokenService.verifyRefreshToken(tokensFromClient.refreshToken);

      const user = await UserService.get({
        _id: decodedRefreshToken.id,
      });

      if (!user) {
        return next(CreateError.UnauthorizedError('You need to log in.'));
      }

      if (user.passwordChangedAt && user.passwordChangedAt > decodedRefreshToken.iat) {
        return next(CreateError.UnauthorizedError('You need to log in.'));
      }

      const tokens = TokenService.signTokens(user);

      ResponseService.sendLogin(res, tokens);
    } catch (err) {
      return next(err);
    }
  }
}

export default UserController;
