import { FastifyInstance } from 'fastify';

import { config } from '~/server/constants';

export default (app: FastifyInstance) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.hostname);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );

    next();
  });
};
