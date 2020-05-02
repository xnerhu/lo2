import { FastifyInstance } from 'fastify';

import ArticleService from '~/server/services/article';

export default (app: FastifyInstance) => {
  app.get('/articles', (req, res) => {
    res.send(ArticleService.test());
  });
};
