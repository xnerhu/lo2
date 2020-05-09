import { FastifyInstance } from 'fastify';

import handleErrors from './middleware/errors';
import handleAuth from './auth';
import routes from './routes';
import apiRouter from './api';

export default async (app: FastifyInstance) => {
  handleErrors(app);
  handleAuth(app);
  routes(app);

  app.register(apiRouter, { prefix: '/api' });
};
