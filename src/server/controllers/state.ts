import { Router } from 'express';

import PageService from '../services/page';
import { handlePageRoute } from '~/server/utils';
import { createArticleFilter } from '~/utils/article';

const router = Router();

router.get('/', handlePageRoute('home', PageService.getHomeData));

router.get(
  '/news/:category?/:page?',
  handlePageRoute('news', (req) => {
    const filter = createArticleFilter(req.params);

    return PageService.getNewsData(filter);
  }),
);

export default router;
