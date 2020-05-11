import { FastifyInstance } from 'fastify';

import useAuth from '../middleware/auth';
import UserService from '~/server/services/user';
import { verifyUser } from '~/server/utils';
import { IRequest } from '~/server/interfaces';
import { IApiResponse } from '~/interfaces';

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.post(
    '/change-password',
    {
      preHandler: useAuth(),
    },
    async (req: IRequest, res) => {
      const { username, password } = req.body ?? {};

      verifyUser(req, username);

      await UserService.changePassword(username, password);

      res.send({ success: true } as IApiResponse);
    },
  );

  next();
};
