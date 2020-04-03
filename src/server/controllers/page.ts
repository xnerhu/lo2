import { Router } from 'express';

import PageService from '../services/page';
import { handlePageRoute } from '~/server/utils';

const router = Router();

router.get('/', handlePageRoute('home', PageService.getHomeData));

router.get(
  '/news/:categoryLabel?/:page?',
  handlePageRoute('news', PageService.getNewsData),
);

export default router;
