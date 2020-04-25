import { Router } from 'express';

import ArticleService from '../../services/article';
import { handleRoute } from '~/server/utils';
import { createArticleFilter } from '~/utils/article';

const router = Router();

router.get(
  '/list',
  handleRoute((query) => {
    const filter = createArticleFilter(query);

    return ArticleService.chunk(filter);
  }),
);

export default router;
