import { Router } from 'express';

import db from '~/server/models/db';
import { formatArticle } from '~/server/utils';
import { getNewsCategories } from './news';
import { getUserData } from './user';
import { formatUser } from '~/server/utils/user';
import { INews } from '~/interfaces';

const router = Router();

export const getArticle = async (_id: number): Promise<INews> => {
  if (!Number.isInteger(_id)) return {};

  const data = await db.news.findOne({ _id });
  const categories = await getNewsCategories();
  const author = await getUserData(data._authorId);
  const category = categories.find(r => r._id === data._categoryId);

  return {
    ...formatArticle(data, categories, false),
    author: formatUser(author),
    category,
  };
}

router.get('/article', async (req, res) => {
  const { _id } = req.query;
  const data = await getArticle(parseInt(_id));

  res.json(data);
});

export default router;
