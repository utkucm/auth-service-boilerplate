import express, { Express } from 'express';
import logger from './logger.helper';

interface ILoadMiddlewares {
  expressApp: Express;
}

const loadMiddlewares = ({ expressApp }: ILoadMiddlewares) => {
  try {
    logger.info('Loading middlewares');
    expressApp.use(express.json());
  } catch (err) {
    logger.error('An unexpecting error occurred while loading middlewares');
    throw err;
  }
};

export default loadMiddlewares;
