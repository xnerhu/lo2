import { Router } from 'express';

import { IRequest } from '../../interfaces/req';
import { getNewsChunk, getNewsCategories } from '../api/news';

const router = Router();

router.get('/news/:page?/:category?/:text?', async (req: IRequest, res, next) => {
  const { page, category, text } = req.params;

  const [news, newsCategories] = await Promise.all([
    getNewsChunk({ page: parseInt(page), category: parseInt(category), text }),
    getNewsCategories()
  ]);

  req.appState = { news, newsCategories };

  next();
});

export default router;
