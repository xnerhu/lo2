import { Router } from 'express';

import {
  getNewsChunk,
  getNewsCategories,
  getShortNews,
  getProposedNews,
} from '~/server/services';
import { formatNewsFilter } from '~/utils';

const router = Router();

router.get('/news', async (req, res) => {
  const filter = formatNewsFilter(req.query);
  const data = await getNewsChunk(filter);

  res.json(data);
});

router.get('/news-categories', async (req, res) => {
  const data = await getNewsCategories();

  res.json(data);
});

router.get('/short-news', async (req, res) => {
  const data = await getShortNews();

  res.json(data);
});

router.get('/proposed-news', async (req, res) => {
  const data = await getProposedNews(req.query.id);

  res.json(data);
});

export default router;
