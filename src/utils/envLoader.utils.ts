import { config } from 'dotenv';
import { join } from 'path';
import CreateError from './errors/CreateError';
import logger from './logger.utils';

logger.info('Loading env variables');
const env = config({ path: join(__dirname, '/../../.env') });

// Checking if .env file exist
if (env.error) {
  logger.error('Error occurred while loading env variables');
  throw CreateError.InternalServerError();
}

// Setting ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

interface IEnvConfig {
  PORT: number;
  ENV: string;
  MONGO_URI: string;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  jwtAccessExpiry: string;
  jwtRefreshExpiry: string;
  apiVersion: string;
}

const configLoader: IEnvConfig = {
  // Server Related
  PORT: Number(process.env.PORT) || 5000,
  ENV: String(process.env.NODE_ENV),
  // Database Stuff
  MONGO_URI: String(process.env.MONGODB_URI),
  // JWT Stuff
  jwtAccessSecret: String(process.env.JWT_ACCESS_SECRET),
  jwtRefreshSecret: String(process.env.JWT_REFRESH_SECRET),
  jwtAccessExpiry: String(process.env.JWT_ACCESS_EXPIRY),
  jwtRefreshExpiry: String(process.env.JWT_REFRESH_EXPIRY),
  // API Related
  apiVersion: String(process.env.API_VERSION),
};

export default configLoader;
