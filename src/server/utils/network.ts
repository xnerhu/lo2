import { FastifyRequest } from 'fastify';

export const getToken = (req: FastifyRequest) => {
  return (
    req?.cookies?.token ||
    req?.body?.token ||
    req?.query?.token ||
    req?.headers['x-access-token']
  );
};
