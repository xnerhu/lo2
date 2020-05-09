import { FastifyInstance } from 'fastify';

import useRender from './middleware/render';

export default (app: FastifyInstance) => {
  app.get('/articles', useRender('articles'));
  app.get('/', useRender('home'));
  app.get('*', useRender());
};
