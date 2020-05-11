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

export const verifyUser = (req: IRequest, username: string) => {
  const signedInUser = req.raw.tokenPayload?.username;

  if (username !== signedInUser) {
    throw new Error('Unauthorized: Access forbidden');
  }
};

export const signedOutUser = (res: FastifyReply<ServerResponse>) => {
  res.clearCookie('token');
};
