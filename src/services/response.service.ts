import { Response } from 'express';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

enum Messages {
  Register = 'You are registered successfully.',
  Login = 'You are logged in successfully.',
  ForgotPassword = 'If we could find a user associated with provided email address. We will send an email to this email address to reset password.',
  ResetPassword = 'You have successfully changed your password.',
  RefreshToken = 'Refresh token has been sent to you.'
}

class ResponseService {
  private static setTokens(res: Response, tokens: Tokens) {
    res.cookie('accessToken', `Bearer ${tokens.accessToken}`)
    res.cookie('refreshToken', tokens.refreshToken)
  }

  public static sendRegister(res: Response, tokens: Tokens) {
    this.setTokens(res, tokens)

    return res
      .status(201)
      .json({
        success: true,
        payload: {
          message: Messages.Register,
        },
      });
  }

  public static sendLogin(res: Response, tokens: Tokens) {
    this.setTokens(res, tokens)

    return res
      .status(200)
      .json({
        success: true,
        payload: {
          message: Messages.Login,
        },
      });
  }

  public static sendForgotPassword(res: Response, resetPasswordURL?: string) {
    return res.status(200).json({
      success: true,
      payload: {
        message:
          Messages.ForgotPassword,
        resetPasswordURL: resetPasswordURL || null,
      },
    });
  }

  public static sendResetPassword(res: Response) {
    return res.status(200).json({
      success: true,
      payload: {
        message: Messages.ResetPassword,
      },
    });
  }

  public static sendRefreshToken(res: Response, tokens: Tokens) {
    this.setTokens(res, tokens)

    return res
      .status(200)
      .json({
        success: true,
        payload: {
          message: Messages.RefreshToken
        },
      });
  }
}

export default ResponseService;
