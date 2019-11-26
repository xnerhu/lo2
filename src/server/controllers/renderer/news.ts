import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getNewsCategories, handleNewsRequest } from '../api/news';

const router = Router();

router.get('/news/:page?/:category?/:text?', async (req: IRequest, res, next) => {
  const [news, newsCategories] = await Promise.all([
    handleNewsRequest(req.params),
    getNewsCategories()
  ]);

  req.appState = { news, newsCategories };

  next();
});

export default router;
