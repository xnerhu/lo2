import { Router } from 'express';

import PageService from '../services/page';
import { handlePageRoute } from '~/server/utils';

const router = Router();

router.get('/', handlePageRoute('home', PageService.getHomeData));

router.get(
  '/news/:category?/:page?',
  handlePageRoute('news', PageService.getNewsData),
);

router.get(
  '/article/:label',
  handlePageRoute('article', PageService.getArticleData),
);

router.get(
  '/personnel',
  handlePageRoute('personnel', PageService.getPersonnelData),
);

router.get(
  '/add-article',
  handlePageRoute('addArticle', PageService.getAddArticlePacket),
);

export default router;
