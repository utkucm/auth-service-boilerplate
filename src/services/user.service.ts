import { UserRepository } from '../data/repositories';
import { IGetFilters, IUserCreate, IUserPartialUpdate } from '../types';

class UserService {
  public static getAll(filters?: IGetFilters) {
    return UserRepository.getAll({ ...filters });
  }

  public static get(filters: IGetFilters) {
    return UserRepository.get(filters);
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
