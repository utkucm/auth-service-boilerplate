import sgMail from '@sendgrid/mail';

import { UserDoc } from '../types';
import { configLoader } from '../utils';

class MailService {
  public static async sendForgotPassword(resetPasswordURL: string, _?: UserDoc) {
    sgMail.setApiKey(configLoader.sgKey);
    const message = {
      to: 'utkucam2@gmail.com',
      from: 'rethja01@gmail.com',
      subject: 'Reset Password',
      html: `<p>Password reset url: ${resetPasswordURL}</p>`,
    };

    try {
      await sgMail.send(message);
    } catch (error) {
      console.log(error);
    }
  }
}

export default MailService;
