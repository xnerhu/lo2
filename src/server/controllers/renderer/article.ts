import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getArticle } from '../api/article';

const router = Router();

router.get('/article/:_id', async (req: IRequest, res, next) => {
  const { _id } = req.params;
  const article = await getArticle(parseInt(_id));

  req.appState = { article };

  next();
});

export default router;
