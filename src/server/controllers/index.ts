import { FastifyInstance } from 'fastify';

import headers from './middleware/headers';
import handleErrors from './middleware/errors';
import handleAuth from './auth';
import routes from './routes';
import apiRouter from './api';

export default (app: FastifyInstance) => {
  headers(app);
  handleErrors(app);
  handleAuth(app);
  routes(app);

  app.register(apiRouter, { prefix: '/api' });

  app.get('/robots.txt', (req, res) => {
    res.redirect('/static/robots.txt');
  });
};
