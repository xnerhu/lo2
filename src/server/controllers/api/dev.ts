import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

import ArticleModel from '~/server/models/article';
import ArticleCategoryModel from '~/server/models/article-category';
import { IArticleCategory } from '~/interfaces';

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

  app.post('/blog/subcategory', async (req, res) => {
    const { label, name, subcategoryRef } = req.body;

    return await ArticleCategoryModel.create({
      label,
      name,
      subcategoryRef: new mongoose.Types.ObjectId(subcategoryRef) as any,
      subcategory: true,
    } as IArticleCategory);
  });

  next();
};
