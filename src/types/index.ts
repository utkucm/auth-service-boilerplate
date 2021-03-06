import { Express } from 'express';
import { Model, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  passwordChangedAt: number | null;
  emailConfirmed: boolean;
  role: UserRole;
  isDeleted: boolean;
  resetPasswordToken: string | null;
  resetPasswordTokenExpires: number | null;
}

export interface UserModel extends Model<UserDoc> {}

export interface UserDoc extends Document {
  username: string;
  email: string;
  password: string;
  passwordChangedAt: number | null;
  emailConfirmed: boolean;
  role: UserRole;
  isDeleted: boolean;
  resetPasswordToken: string | null;
  resetPasswordTokenExpires: number | null;
  verifyPassword: (hashedPassword: string, plainPassword: string) => boolean;
}

// Repository
export interface IUserCreate {
  username: string;
  email: string;
  password: string;
}

export interface IUserPartialUpdate {
  id: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface IGetFilters {
  _id?: string;
  username?: string;
  email?: string;
  emailConfirmed?: boolean;
  role?: UserRole;
  isDeleted?: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpires?: {
    $gt: number;
  };
  passwordChangedAt?: {
    $lt: number;
  };
}

// Errors
export interface IError {
  name: string;
  message: string;
}

export interface IErrors {
  validation: IError;
  unauthorized: IError;
  notFound: IError;
  internalServer: IError;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

// Mongoose
export interface IMongoConnectOptions {
  useNewUrlParser: true;
  useUnifiedTopology: true;
  useCreateIndex: true;
  useFindAndModify: true;
}

// Environment
export interface IEnvConfig {
  PORT: number;
  ENV: string;
  MONGO_URI: string;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  jwtAccessExpiry: string;
  jwtRefreshExpiry: string;
  apiVersion: string;
  sgKey: string;
}

// ExpressJS
export interface ILoadMiddlewares {
  expressApp: Express;
}

// MAIL
export interface IMailOptions {
  service: string;
  port: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    rejectUnauthorized: boolean;
  };
}
