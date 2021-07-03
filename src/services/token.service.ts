import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { CreateError, logger } from '../utils';
import { UserDoc } from '../types';
import configLoader from '../utils/envLoader.utils';

class TokenService {
  /**
   * @JWT_RELATED
   */
  public static getTokens(req: Request) {
    const accessToken = this.getAccessToken(req);
    const refreshToken = this.getRefreshToken(req);

    if (!accessToken || !refreshToken) {
      throw CreateError.UnauthorizedError();
    }

    return { accessToken, refreshToken };
  }

  private static getAccessToken(req: Request) {
    return req.headers.authorization?.split(' ')[1];
  }

  private static getRefreshToken(req: Request) {
    return req.headers.cookie?.split('=')[1];
  }

  public static verifyAccessToken(accessToken: string) {
    try {
      return jwt.verify(accessToken, configLoader.jwtAccessSecret) as any;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return error.name;
      }
      logger.error(error);
      throw CreateError.UnauthorizedError();
    }
  }

  public static verifyRefreshToken(refreshToken: string) {
    try {
      return jwt.verify(refreshToken, configLoader.jwtRefreshSecret) as any;
    } catch (error) {
      logger.error(error);
      throw CreateError.UnauthorizedError();
    }
  }

  public static signTokens(user: UserDoc) {
    const accessToken = this.signAccessToken(user);
    const refreshToken = this.signRefreshToken(user);

    return { accessToken, refreshToken };
  }

  private static signAccessToken(user: UserDoc): string {
    return jwt.sign({ id: user.id }, configLoader.jwtAccessSecret, {
      expiresIn: configLoader.jwtAccessExpiry,
      audience: user.email,
    });
  }

  private static signRefreshToken(user: UserDoc): string {
    return jwt.sign({ id: user.id }, configLoader.jwtRefreshSecret, {
      expiresIn: configLoader.jwtRefreshExpiry,
      audience: user.email,
    });
  }
}

export default TokenService;
