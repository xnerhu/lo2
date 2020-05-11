import { FastifyInstance } from 'fastify';

import auth from './auth';
import user from './user';
import bundle from './bundle';

export default (app: FastifyInstance, opts: any, done: Function) => {
  app.register(auth, { prefix: '/auth' });
  app.register(user, { prefix: '/user' });

  bundle(app);

  done();
};
