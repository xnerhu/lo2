import { Router } from 'express';

import db from '~/server/models/db';
import { formatArticle } from '~/server/utils';
import { getNewsCategories } from './news';

const router = Router();

export const getArticle = async (_id: number) => {
  if (!Number.isInteger(_id)) return {};

  const data = await db.news.findOne({ _id });
  const categories = await getNewsCategories();

  return formatArticle(data, categories, false);
}

router.get('/article', async (req, res) => {
  const { _id } = req.query;
  const data = await getArticle(parseInt(_id));

  res.json(data);
});

export default router;
