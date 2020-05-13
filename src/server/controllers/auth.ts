import { FastifyInstance } from 'fastify';

import AuthService from '~/server/services/auth';
import { getToken } from '~/server/utils';
import { IRequest } from '~/server/interfaces';

export default (app: FastifyInstance) => {
  app.addHook('preValidation', async (req: IRequest) => {
    const token = getToken(req);
    const decoded = await AuthService.decodeToken(token);

    if (decoded instanceof Error) {
      req.raw.tokenErrorCode = parseInt(decoded.message);
    } else {
      req.raw.tokenPayload = decoded?.data ?? {};
    }
  });
};
