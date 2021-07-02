import { Request } from 'express';
import crypto from 'crypto';

import { UserDoc } from '../types';

class PasswordService {
  public static async generatePasswordReset(req: Request, user: UserDoc) {
    const randomString = this.generateRandomString();
    const resetPasswordURL = this.generateResetPasswordURL(req, randomString);

    user.resetPasswordToken = randomString;
    user.resetPasswordTokenExpires = this.generateResetPasswordExpiryDate();

    await user.save();

    return resetPasswordURL;
  }

  private static generateResetPasswordExpiryDate() {
    return Date.now() + 15 * 60 * 1000;
  }

  private static generateResetPasswordURL(req: Request, resetPasswordToken: string) {
    return `${req.protocol}://${req.get('host')}${req.baseUrl}/reset-password/${resetPasswordToken}`;
  }

  private static generateRandomString() {
    return crypto.randomBytes(32).toString('hex');
  }
}

export default PasswordService;
