import express, { Express } from 'express';
import { CreateError } from './utils';

const expressApp: Express = express();

process.on('uncaughtException', () => {
  throw CreateError.InternalServerError();
});

// process.on('unhandledRejection', () => {
//   throw CreateError.InternalServerError();
// });

export default expressApp;
