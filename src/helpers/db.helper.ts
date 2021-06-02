import mongoose from 'mongoose';

import configLoader from './envLoader.helper';
import logger from './logger.helper';

interface IMongoConnectOptions {
  useNewUrlParser: true;
  useUnifiedTopology: true;
  useCreateIndex: true;
  useFindAndModify: true;
}

const MongoConnectOptions: IMongoConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
};

const connectDB = async (): Promise<typeof mongoose> => {
  try {
    logger.info('Connecting to Database');
    const connection = await mongoose.connect(configLoader.MONGO_URI, MongoConnectOptions);
    logger.info('Database connection is successfull');
    return connection;
  } catch (err) {
    logger.error(`There is an unexpected error occurred when connecting to the database`);
    throw err;
  }
};

export default connectDB;
