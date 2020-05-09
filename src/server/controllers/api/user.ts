import { FastifyInstance } from 'fastify';

import useAuth from '../middleware/auth';
import UserService from '~/server/services/user';

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.post(
    '/change-password',
    {
      preHandler: useAuth(),
      schema: {
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['username', 'password'],
        },
      },
    },
    async (req, res) => {
      const { username, password } = req.body;

      const success = await UserService.changePassword(username, password);

      res.send({ success });
    },
  );

  next();
};
