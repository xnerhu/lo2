import { Router } from 'express';

import { getNews } from './news';

const router = Router();

export const getShortNews = () => {
  return getNews({ limit: 9 });
}

router.get('/short-news', async (req, res) => {
  const data = await getShortNews();

  res.json(data);
});

export default router;
