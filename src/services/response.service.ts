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
      .set('Authorization', tokens.accessToken)
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
      .set('Authorization', tokens.accessToken)
      .json({
        success: true,
        payload: {
          message: 'You are logged in successfully.',
        },
      });
  }
}

export default ResponseService;
