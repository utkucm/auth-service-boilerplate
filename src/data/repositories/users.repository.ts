import CreateError from '../../utils/errors/CreateError';
import { User } from '../models';
import { IGetAll, IUserCreate, IUserPartialUpdate, UserDoc } from '../../types';
import { logger } from 'src/utils';

class UserRepository {
  public static async getAll(filters?: IGetAll): Promise<UserDoc[]> {
    try {
      const users = await User.find({ filters });

      if (!users) {
        logger.error('User not found.');
        throw CreateError.NotFoundError('No users found.');
      }

      return users;
    } catch (err) {
      logger.error('Error occured when fetching the users from database.');
      throw CreateError.InternalServerError('Something went wrong when creating a new user.');
    }
  }
  public static async get(id: string): Promise<UserDoc> {
    try {
      const foundUser = await User.findById(id);

      if (!foundUser) {
        logger.error('User not found.');
        throw CreateError.NotFoundError('User not found.');
      }

      return foundUser;
    } catch (err) {
      logger.error('Error occured when fetching the user from database.');
      throw CreateError.InternalServerError('Something went wrong when creating a new user.');
    }
  }

  public static async create({ username, email, password }: IUserCreate): Promise<UserDoc> {
    try {
      const isUserExist = await User.findOne({ email });

      if (!isUserExist) {
        logger.error('A user with this email already exists.');
        throw CreateError.BadRequestError('A user with this email already exists.');
      }

      return await User.create({ username, email, password });
    } catch (err) {
      logger.error('Error occured when creating a new user.');
      throw CreateError.InternalServerError('Something went wrong when creating a new user.');
    }
  }

  public static async update({ id, username, email, password }: IUserPartialUpdate) {
    return await this.partialUpdate({ id, username, email, password });
  }

  public static async partialUpdate({ id, username, email, password }: IUserPartialUpdate) {
    try {
      const foundUser = await User.findById(id);

      if (!foundUser) {
        logger.error('User not found.');
        throw CreateError.NotFoundError('User not founnd.');
      }

      if (foundUser.username !== undefined) foundUser.username = username as string;
      if (foundUser.email !== undefined) foundUser.email = email as string;
      if (foundUser.password !== undefined) foundUser.password = password as string;

      return await foundUser.save();
    } catch (err) {
      logger.error('Error occured when updating the user.');
      throw CreateError.InternalServerError('Something went wrong when updating the user.');
    }
  }

  public static async delete(id: string) {
    try {
      const foundUser = await User.findById(id);

      if (!foundUser) {
        logger.error('User not found.');
        throw CreateError.NotFoundError('User not founnd.');
      }

      foundUser.isDeleted = true;

      return await foundUser.save();
    } catch (err) {
      logger.error('Error occured when deleting the user.');
      throw CreateError.InternalServerError('Something went wrong when deleting the user.');
    }
  }
}

export default UserRepository;
