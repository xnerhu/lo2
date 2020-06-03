import { IUser } from '~/interfaces';
import UserModel from '../models/user';
import { hashString } from '../utils';

class UserService {
  public format(data: IUser): IUser {
    return {
      ...data,
      _id: data._id.toString(),
      image: `/static/users/${data._id}`,
      password: undefined,
    };
  }

  public async changePassword(username: string, newPassword: string) {
    if (!username || !newPassword) {
      throw new Error('Provide username and password!');
    }

    const hashed = await hashString(newPassword);

    const updated = await UserModel.findOneAndUpdate(
      { username },
      { password: hashed },
    );

    if (!updated) {
      throw new Error(`User ${username} doesn\'t exists!`);
    }
  }
}

export default new UserService();
