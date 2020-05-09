import { sign, verify } from 'jsonwebtoken';

import { IUser } from '~/interfaces';
import { config } from '../constants/config';
import { IToken } from '../interfaces';
import UserService from '../services/user';

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
}

export default new AuthService();
