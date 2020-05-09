import { FastifyInstance } from 'fastify';

import user from './user';
import bundle from './bundle';

export default (app: FastifyInstance, opts: any, done: Function) => {
  app.register(user, { prefix: '/user' });

  bundle(app);

  done();
};
