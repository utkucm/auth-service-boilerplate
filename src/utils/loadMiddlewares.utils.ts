import express, { Express } from 'express';

import { errorHandler } from '../middlewares';
import CreateError from './errors/CreateError';
import logger from './logger.utils';

interface ILoadMiddlewares {
  expressApp: Express;
}

const loadMiddlewares = ({ expressApp }: ILoadMiddlewares): void => {
  try {
    logger.info('Loading middlewares');
    expressApp.use(express.json());
    expressApp.use(errorHandler);
  } catch (err) {
    logger.error('An unexpecting error occurred while loading middlewares');
    throw CreateError.InternalServerError();
  }
};

export default loadMiddlewares;
