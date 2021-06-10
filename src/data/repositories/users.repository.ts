import CreateError from '../../utils/errors/CreateError';
import { User } from '../models';
import { IGetFilters, IUserCreate, IUserPartialUpdate, UserDoc } from '../../types';
import { logger } from '../../utils';

class UserRepository {
  public static async getAll(filters?: IGetFilters): Promise<UserDoc[]> {
    const users = await User.find({ ...filters }).sort('username');

    if (!users) {
      logger.error('User not found.');
      throw CreateError.NotFoundError('No users found.');
    }

    return users;
  }

  public static async get(filters: IGetFilters): Promise<UserDoc> {
    const foundUser = await User.findOne({ ...filters }).exec();

    if (!foundUser) {
      logger.error('User not found.');
      throw CreateError.NotFoundError('User not found.');
    }

    return foundUser;
  }

  public static async create({ username, email, password }: IUserCreate): Promise<UserDoc> {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      logger.error('A user with this email already exists.');
      throw CreateError.BadRequestError('A user with this email already exists.');
    }

    return await User.create({ username, email, password });
  }

  public static async update({ id, username, email, password }: IUserPartialUpdate) {
    return await this.partialUpdate({ id, username, email, password });
  }

  public static async partialUpdate({ id, username, email, password }: IUserPartialUpdate) {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      logger.error('User not found.');
      throw CreateError.NotFoundError('User not founnd.');
    }

    if (foundUser.username !== undefined) foundUser.username = username as string;
    if (foundUser.email !== undefined) foundUser.email = email as string;
    if (foundUser.password !== undefined) foundUser.password = password as string;

    return await foundUser.save();
  }

  public static async delete({ id }: { id: string }) {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      logger.error('User not found.');
      throw CreateError.NotFoundError('User not founnd.');
    }

    foundUser.isDeleted = true;

    return await foundUser.save();
  }
}

export default UserRepository;
