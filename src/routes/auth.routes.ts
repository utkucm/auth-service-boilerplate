import { Router } from 'express';
import { AuthMiddlewares } from '../middlewares';

const authRouter: Router = Router();

authRouter.route('/register').post(AuthMiddlewares.validateRegister);

export default authRouter;
