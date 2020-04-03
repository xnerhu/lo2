import { Router } from 'express';

import PageService from '../../services/page';
import { handleRoute } from '~/server/utils';

const router = Router();

router.get('/home', handleRoute(PageService.getHomeData));

router.get('/news', handleRoute(PageService.getNewsData));

export default router;
