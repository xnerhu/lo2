import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

import ArticleModel from '~/server/models/article';

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.post('/blog/reset-images', async (req, res) => {
    const deleted = await ArticleModel.updateMany(
      { hasImage: true },
      { hasImage: false },
    )
      .lean()
      .exec();

    return deleted;
  });

  app.post('/blog/delete', async (req, res) => {
    const deleted = await ArticleModel.deleteMany({
      _id: new mongoose.Types.ObjectId(req.body._id) as any,
    })
      .lean()
      .exec();

    return deleted;
  });

  next();
};
