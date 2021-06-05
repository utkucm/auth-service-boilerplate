import mongoose from 'mongoose';
import { IMongoConnectOptions } from '../types';

import configLoader from './envLoader.utils';
import BaseError from './errors/BaseError';
import CreateError from './errors/CreateError';
import logger from './logger.utils';

const MongoConnectOptions: IMongoConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
};

const connectDB = async (): Promise<typeof mongoose | BaseError> => {
  try {
    logger.info('Connecting to Database');
    const connection = await mongoose.connect(configLoader.MONGO_URI, MongoConnectOptions);
    logger.info('Database connection is successfull');
    return connection;
  } catch (err) {
    logger.error(`There is an unexpected error occurred when connecting to the database`);
    // console.log(err);
    throw CreateError.InternalServerError();
  }
};

export default connectDB;
