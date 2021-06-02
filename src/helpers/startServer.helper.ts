import { Express } from 'express';
import { Server } from 'http';

import configLoader from './envLoader.helper';
import logger from './logger.helper';

interface IStartServer {
  expressApp: Express;
}

const startServer = ({ expressApp }: IStartServer): Server => {
  logger.info('Starting express server');
  return expressApp.listen(configLoader.PORT);
};

export default startServer;
