import { Response } from 'express';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

class ResponseService {
  public static sendRegister(res: Response, tokens: Tokens) {
    return res
      .status(201)
      .cookie('jid', tokens.refreshToken)
      .set('Authorization', `Bearer ${tokens.accessToken}`)
      .json({
        success: true,
        payload: {
          message: 'You are registered successfully.',
        },
      });
  }

  public static sendLogin(res: Response, tokens: Tokens) {
    return res
      .status(200)
      .cookie('jid', tokens.refreshToken)
      .set('Authorization', `Bearer ${tokens.accessToken}`)
      .json({
        success: true,
        payload: {
          message: 'You are logged in successfully.',
        },
      });
  }

  public static sendForgotPassword(res: Response, resetPasswordURL?: string) {
    return res.status(200).json({
      success: true,
      payload: {
        message:
          'If we could find a user associated with provided email address. We will send an email to this email address to reset password.',
        resetPasswordURL: resetPasswordURL || null,
      },
    });
  }

  public static sendResetPassword(res: Response) {
    return res.status(200).json({
      success: true,
      payload: {
        message: 'You have successfully changed your password.',
      },
    });
  }

  public static sendRefreshToken(res: Response, tokens: Tokens) {
    return res
      .status(200)
      .cookie('jid', tokens.refreshToken)
      .set('Authorization', `Bearer ${tokens.accessToken}`)
      .json({
        success: true,
        payload: {},
      });
  }
}

export default ResponseService;
