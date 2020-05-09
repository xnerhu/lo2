import { FastifyInstance } from 'fastify';

import resolver from '~/server/resolvers';

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
      const data = await resolver(req.params.name);

      res.send(data);
    },
  );
};
