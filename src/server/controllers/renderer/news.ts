import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getNewsChunk, getNewsCategories } from '~/server/services';
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

export default router;
