import { json } from 'express';

import CreateError from './errors/CreateError';
import configLoader from './envLoader.utils';
import logger from './logger.utils';
import { errorHandler } from '../middlewares';
import { ILoadMiddlewares } from '../types';
import { authRouter } from '../routes';

const loadMiddlewares = ({ expressApp }: ILoadMiddlewares): void => {
  try {
    logger.info('Loading middlewares');
    expressApp.use(json());
    expressApp.use(`/api/${configLoader.apiVersion}/auth`, authRouter);
    expressApp.use(errorHandler);
  } catch (err) {
    logger.error('An unexpecting error occurred while loading middlewares');
    throw CreateError.InternalServerError();
  }
};

export default loadMiddlewares;
