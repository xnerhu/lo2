import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { IRequest } from '../interfaces';

export const getToken = (req: FastifyRequest) => {
  return (
    req?.cookies?.token ||
    req?.body?.token ||
    req?.query?.token ||
    req?.headers['x-access-token']
  );
};

export const verifyUser = (req: IRequest, username: string | number) => {
  const user = req.raw.tokenPayload ?? {};

  if (user[typeof username === 'string' ? 'username' : '_id'] !== username) {
    throw new Error('Unauthorized: Access forbidden');
  }
};

export const signOutUser = (res: FastifyReply<ServerResponse>) => {
  res.clearCookie('token');
};
