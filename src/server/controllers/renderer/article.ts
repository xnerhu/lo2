import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getArticle, getProposedNews } from '~/server/services';

const router = Router();

router.get('/article/:id', async (req: IRequest, res, next) => {
  const id = req.params.id as any;

  const [article, proposedNews] = await Promise.all([
    getArticle(id),
    getProposedNews(id),
  ]);

  req.appState = { article, proposedNews };

  next();
});

export default router;
