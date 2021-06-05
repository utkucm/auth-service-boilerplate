import { Router } from 'express';
import { configLoader } from 'src/utils';

const authRouter: Router = Router();

authRouter.route(`/api/${configLoader.apiVersion}/auth`).post;
