import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

import ArticleModel from '~/server/models/article';
import ArticleCategoryModel from '~/server/models/article-category';
import { IArticleCategory, IUser } from '~/interfaces';
import UserModel from '~/server/models/user';

export default (app: FastifyInstance, opts: any, next: Function) => {
  app.post('/blog/edit', async (req) => {
    const { _id, body } = req.body;

    const res = await ArticleModel.updateOne(
      { _id: new mongoose.Types.ObjectId(_id) as any },
      { $set: { body } },
    )
      .lean()
      .exec();

    return res;
  });

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

  app.post('/user/add', async (req) => {
    const {
      admin,
      firstName,
      lastName,
      password,
      username,
    } = req.body as IUser;

    const res = await UserModel.create({
      admin: (admin as string) === 'true',
      firstName,
      lastName,
      password,
      username,
    } as IUser);

    return res;
  });

  next();
};
