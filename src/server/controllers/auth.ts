import { FastifyInstance } from 'fastify';

import AuthService from '~/server/services/auth';
import { getToken } from '~/server/utils';
import { IRequest } from '~/server/interfaces';

export default (app: FastifyInstance) => {
  app.addHook('onRequest', async (req: IRequest, rep, next: Function) => {
    const token = getToken(req);
    const decoded = await AuthService.decodeToken(token);

    if (decoded instanceof Error) {
      req.tokenErrorCode = parseInt(decoded.message);
    } else {
      req.tokenPayload = decoded?.data ?? {};
    }

    next();
  });
};
