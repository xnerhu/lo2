import { FastifyInstance } from 'fastify';

import auth from './auth';
import state from './state';
import clientRouter from './client';
import apiRouter from './api';

export default (app: FastifyInstance) => {
  auth(app);
  state(app);
  clientRouter(app);

  app.register(apiRouter, { prefix: '/api' });
};
