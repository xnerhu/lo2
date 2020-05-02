import { FastifyInstance } from 'fastify';

import clientRouter from './client';
import apiRouter from './api';
import stateRouter from './state';

export default (app: FastifyInstance) => {
  stateRouter(app);
  clientRouter(app);

  app.register(apiRouter, { prefix: '/api' });
};
