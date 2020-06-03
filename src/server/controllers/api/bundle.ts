import { FastifyInstance } from 'fastify';

import resolver from '~/server/resolvers';
import { IRequest } from '~/server/interfaces';

export default (app: FastifyInstance) => {
  app.get(
    '/bundle/:name',
    {
      schema: {
        params: {
          name: { type: 'string' },
        },
      },
    },
    async (req: IRequest, res) => {
      const data = await resolver(
        req.params.name,
        req.query,
        req.raw.tokenPayload,
      );

      return data;
    },
  );
};
