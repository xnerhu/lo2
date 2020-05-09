import { IUser } from '~/interfaces';

class UserService {
  public format(data: IUser): IUser {
    return {
      ...data,
      image: `/static/users/${data._id}`,
      password: undefined,
    };
  }
}

export default new UserService();
