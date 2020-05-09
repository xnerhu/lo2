import { FastifyInstance } from 'fastify';

import ArticleService from '~/server/services/article';
import useAuth from '../middleware/auth';

export default (app: FastifyInstance) => {
  app.get('/articles', (req, res) => {
    res.send(ArticleService.test());
  });
};
