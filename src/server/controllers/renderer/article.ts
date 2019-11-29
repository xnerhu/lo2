import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getArticle } from '../api/article';
import { getNewsCategories } from '../api/news';

const router = Router();

router.get('/article/:_id', async (req: IRequest, res, next) => {
  const { _id } = req.params;

  const [article, newsCategories] = await Promise.all([
    getArticle(parseInt(_id)),
    getNewsCategories()
  ]);

  req.appState = { article, newsCategories };

  next();
});

export default router;
