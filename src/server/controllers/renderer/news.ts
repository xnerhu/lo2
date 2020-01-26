import { Router } from 'express';

import { IRequest } from '../../interfaces';
import {
  getNewsChunk,
  getNewsCategories,
  getArticleChunk,
} from '~/server/services';
import { formatNewsFilter } from '~/utils';

const router = Router();

router.get('/news/:categoryLabel?/:page?', async (req: IRequest, res, next) => {
  const filter = formatNewsFilter(req.params);

  const [news, newsCategories] = await Promise.all([
    getNewsChunk(filter),
    getNewsCategories(),
  ]);

  req.appState = { news, newsCategories };

  next();
});

router.get('/article/:label', async (req: IRequest, res, next) => {
  const { label } = req.params;
  const article = await getArticleChunk(label);

  req.appState = { article };

  next();
});

export default router;
