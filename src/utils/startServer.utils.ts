import { Express } from 'express';
import { Server } from 'http';

import configLoader from './envLoader.utils';
import logger from './logger.utils';

interface IStartServer {
  expressApp: Express;
}

const startServer = ({ expressApp }: IStartServer): Server => {
  logger.info('Starting express server');
  return expressApp.listen(configLoader.PORT, () => {
    logger.info(`Server started on PORT:${configLoader.PORT}, mode: ${configLoader.ENV}`);
  });
};

export default startServer;
