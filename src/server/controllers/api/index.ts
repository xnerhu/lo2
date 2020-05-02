import { FastifyInstance } from 'fastify';

import article from './article';
import bundle from './bundle';

export default (app: FastifyInstance, opts: any, done: Function) => {
  article(app);
  bundle(app);

  done();
};
