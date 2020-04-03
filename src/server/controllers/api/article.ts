import { Router } from 'express';

import ArticleService from '../../services/article';
import ArticleCategoryService from '../../services/article-category';
import { handleRoute } from '~/server/utils';
import { createArticleFilter } from '~/utils/article';

const router = Router();

router.get(
  '/',
  handleRoute((req) => ArticleService.find(req.query.label)),
);

router.get(
  '/list',
  handleRoute((req) => {
    const filter = createArticleFilter(req.query);

    return ArticleService.chunk(filter);
  }),
);

router.get(
  '/category',
  handleRoute((req) => ArticleCategoryService.find(req.query.label)),
);

router.get('/category/list', handleRoute(ArticleCategoryService.findMany));

export default router;
