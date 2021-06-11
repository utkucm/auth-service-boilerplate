import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { UserDoc } from '../types';
import configLoader from '../utils/envLoader.utils';

interface IVerifyTokens {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

class TokenService {
  /**
   * @JWT_RELATED
   */
  public static getTokens(req: Request) {
    const accessToken = this.getAccessToken(req);
    const refreshToken = this.getRefreshToken(req);

    return { accessToken, refreshToken };
  }

  private static getAccessToken(req: Request) {
    return req.headers.authorization?.split(' ')[1];
  }

  private static getRefreshToken(req: Request) {
    return req.headers.cookie?.split('=')[1];
  }

  public static verifTokens(tokens: IVerifyTokens) {
    const decodedAccessToken = this.verifyAccessToken(tokens.accessToken);
    const decodedRefreshToken = this.verifyRefreshToken(tokens.refreshToken);

    return { decodedAccessToken, decodedRefreshToken };
  }

  private static verifyAccessToken(accesstoken: string | undefined) {
    return jwt.verify(`${accesstoken}`, configLoader.jwtAccessSecret) as any;
  }

  private static verifyRefreshToken(refreshtoken: string | undefined) {
    return jwt.verify(`${refreshtoken}`, configLoader.jwtRefreshSecret) as any;
  }

  public static signTokens(user: UserDoc) {
    const accessToken = this.signAccessToken(user);
    const refreshToken = this.signRefreshToken(user);

    return { accessToken, refreshToken };
  }

  private static signAccessToken(user: UserDoc): string {
    return `Bearer ${jwt.sign({ id: user.id }, configLoader.jwtAccessSecret, {
      expiresIn: configLoader.jwtAccessExpiry,
      audience: user.email,
    })}`;
  }

  private static signRefreshToken(user: UserDoc): string {
    return jwt.sign({ id: user.id }, configLoader.jwtRefreshSecret, {
      expiresIn: configLoader.jwtRefreshExpiry,
      audience: user.email,
    });
  }
}

export default TokenService;
