import jwt from 'jsonwebtoken';

import { UserDoc } from '../types';
import configLoader from '../utils/envLoader.utils';

interface IVerifyTokens {
  accessToken: string;
  refreshToken: string;
}

class TokenService {
  public static verifTokens(tokens: IVerifyTokens) {
    const decodedAccessToken = this.verifyAccessToken(tokens.accessToken);
    const decodedRefreshToken = this.verifyRefreshToken(tokens.refreshToken);

    return { decodedAccessToken, decodedRefreshToken };
  }

  private static verifyAccessToken(accesstoken: string) {
    return jwt.verify(accesstoken, configLoader.jwtAccessSecret) as any;
  }

  private static verifyRefreshToken(refreshtoken: string) {
    return jwt.verify(refreshtoken, configLoader.jwtRefreshSecret) as any;
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
