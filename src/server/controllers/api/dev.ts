import { FastifyInstance } from 'fastify';

import ArticleModel from '~/server/models/article';

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.post('/articles/reset-images', async (req, res) => {
    const deleted = await ArticleModel.updateMany(
      { hasImage: true },
      { hasImage: false },
    )
      .lean()
      .exec();

    return deleted;
  });

  next();
};
