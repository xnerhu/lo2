import { IUser } from '~/interfaces';
import { db } from '../models/db';
import { hashString } from '../utils';

class UserService {
  public async find(username: string): Promise<IUser> {
    const [item] = await db<IUser>('users').where({ username }).limit(1);

    return item;
  }

  public async create(data: IUser): Promise<IUser> {
    const hashedPassword = await hashString(data.password);

    const [id] = await db<IUser>('users').insert({
      ...data,
      password: hashedPassword,
    });

    return { ...data, id, password: undefined };
  }

  public async changePassword(username: string, newPassword: string) {
    const user = await this.find(username);

    if (!user) {
      throw new Error(`User ${username} doesn\'t exists!`);
    }

    const hashed = await hashString(newPassword);

    await db<IUser>('users')
      .where({ username })
      .limit(1)
      .update({ password: hashed });
  }
}

export default new UserService();
