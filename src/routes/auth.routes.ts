import { Router } from 'express';

import { UserController } from '../controllers';
import { AuthMiddlewares } from '../middlewares';

const authRouter: Router = Router();

authRouter.route('/register').post(AuthMiddlewares.validateRegister, UserController.register);
authRouter.route('/login').post(AuthMiddlewares.validateLogin, UserController.login);
authRouter.route('/forgot-password').post(AuthMiddlewares.validateForgotPassword, UserController.forgotPassword);
authRouter
  .route('/reset-password/:resetPasswordToken')
  .post(AuthMiddlewares.validateResetPassword, UserController.resetPassword);

export default authRouter;
