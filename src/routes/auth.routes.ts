import { Router } from 'express';

import { UserController } from '../controllers';
import { AuthMiddlewares } from '../middlewares';

const authRouter: Router = Router();

authRouter.route('/register').post(AuthMiddlewares.validateRegister, UserController.register);
authRouter.route('/login').post(AuthMiddlewares.validateLogin, UserController.login);

export default authRouter;
