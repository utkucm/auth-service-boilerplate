import { UserRepository } from '../data/repositories';
import { IGetAll, IUserCreate, IUserPartialUpdate } from '../types';

class UserService {
  public static getAll(filters?: IGetAll) {
    return UserRepository.getAll({ ...filters });
  }

  public static get(arg: { id: string }) {
    return UserRepository.get({ ...arg });
  }

  public static create(args: IUserCreate) {
    return UserRepository.create({ ...args });
  }

  public static update(args: IUserPartialUpdate) {
    return UserRepository.update({ ...args });
  }

  public static delete(args: { id: string }) {
    return UserRepository.delete({ ...args });
  }
}

export default UserService;
