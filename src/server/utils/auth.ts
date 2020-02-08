import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { IUser } from '~/interfaces';
import { IAccessTokenPayload } from '../interfaces';
import { formatUser } from './user';
import { ACCESS_TOKEN_EXPIRATION } from '../constants';

export const getAccessToken = (req: Request) => {
  return (
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token
  );
};

export const generateAccessToken = (user: IUser) => {
  const secret = process.env.TOKEN_SECRET;

  const payload: IAccessTokenPayload = {
    type: 'ACCESS_TOKEN',
    user: formatUser(user),
  };

  return sign(payload, secret, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

export const verifyAccessToken = (
  req: Request,
): Promise<IAccessTokenPayload> => {
  return new Promise((resolve, reject) => {
    const token = getAccessToken(req);

    if (!token) return reject('Unauthorized: No token provided');

    const secret = process.env.TOKEN_SECRET;

    verify(token, secret, (err: Error, decoded: IAccessTokenPayload) => {
      if (err) {
        return reject('Unauthorized: Invalid token');
      }

      resolve(decoded);
    });
  });
};
