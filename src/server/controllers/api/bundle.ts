import { FastifyInstance } from 'fastify';

import { appStateResolver } from '~/server/resolvers/app-state';

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
    async (req, res) => {
      const data = await appStateResolver(req.params.name);

      res.send(data);
    },
  );
};
