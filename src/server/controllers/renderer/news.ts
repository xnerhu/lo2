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

// router.get('/news/:id', async (req: IRequest, res, next) => {
//   const { id } = req.params;
//   const parsed = parseInt(id);

//   if (!Number.isNaN(parsed)) {
//     const data = await getNewsData(parsed);

//     req.appState = { article: data };
//   }

//   next();
// });

export default router;
