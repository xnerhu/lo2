import { FastifyInstance } from 'fastify';

import handleAuth from './auth';
import routes from './routes';
import apiRouter from './api';

export default async (app: FastifyInstance) => {
  handleAuth(app);
  routes(app);

  app.register(apiRouter, { prefix: '/api' });
};
