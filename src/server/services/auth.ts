import { sign, verify } from 'jsonwebtoken';

import { IUser } from '~/interfaces';
import { config } from '../constants/config';
import { IToken } from '../interfaces';
import UserService from '../services/user';
import UserModel from '../models/user';
import { compareHashed } from '../utils';

class AuthService {
  public createToken(user: IUser) {
    const token: IToken = {
      type: 'ACCESS_TOKEN',
      data: UserService.format(user),
    };

    return sign(token, config.tokenSecret, {
      expiresIn: config.tokenExpirationTime,
    });
  }

  public decodeToken(token: string): Promise<IToken | Error> {
    return new Promise((resolve) => {
      if (!token) {
        return resolve(new Error('401'));
      }

      verify(token, config.tokenSecret, (err: Error, token: IToken) => {
        if (err) {
          return resolve(new Error('403'));
        }

        resolve(token);
      });
    });
  }

  public async authenticateUser(username: string, password: string) {
    if (!username) throw new Error('Username must be provided!');
    if (!password) throw new Error('Password must be provided!');

    const user: IUser = await UserModel.findOne({ username }).lean().exec();

    if (!user) throw new Error('Invalid username!');

    const correct = await compareHashed(password, user.password);

    if (!correct) throw new Error('Invalid password!');

    const token = await this.createToken(user);

    return { token, user };
  }
}

export default new AuthService();
