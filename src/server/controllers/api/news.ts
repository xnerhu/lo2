import { Router } from 'express';

import {
  getNewsChunk,
  getNewsCategories,
  getArticlePagePacket,
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

router.get('/article', async (req, res) => {
  const data = await getArticlePagePacket(req.query.label);

  res.json(data);
});

export default router;
