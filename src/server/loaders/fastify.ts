import { FastifyInstance } from 'fastify';
import compress from 'fastify-compress';
import cors from 'fastify-cors';
import cookies from 'fastify-cookie';
import helmet from 'fastify-helmet';
import body from 'fastify-formbody';
import staticDir from 'fastify-static';

import config from '../config';
import useGraphql from './graphql';

export default (app: FastifyInstance) => {
  app.register(cors);
  app.register(helmet, {
    noSniff: false,
  });
  app.register(cookies);
  app.register(body);
  useGraphql(app);
  app.register(compress);

  app.register(staticDir, {
    prefix: '/static/bundle',
    root: config.clientDirectory,
    decorateReply: false,
  });

  app.register(staticDir, {
    prefix: '/static',
    root: config.staticDirectory,
    decorateReply: false,
  });

  app.get('/robots.txt', (req, res) => {
    res.redirect('/static/robots.txt');
  });
};
