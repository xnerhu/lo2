import { FastifyInstance } from 'fastify';

import { config } from '~/server/constants';
import auth from './auth';
import article from './article';
import user from './user';
import bundle from './bundle';
import dev from './dev';

export default (app: FastifyInstance, opts: any, done: Function) => {
  app.register(article, { prefix: '/article' });
  app.register(auth, { prefix: '/auth' });
  app.register(user, { prefix: '/user' });

  if (config.dev) {
    app.register(dev, { prefix: '/dev' });
  }

  bundle(app);

  done();
};
