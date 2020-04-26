import { Router } from 'express';

import PageService from '../../services/page';
import { handleRoute } from '~/server/utils';

const router = Router();

router.get('/home', handleRoute(PageService.getHomeData));

router.get('/news', handleRoute(PageService.getNewsData));

router.get('/article', handleRoute(PageService.getArticleData));

router.get('/addArticle', handleRoute(PageService.getAddArticlePacket));

router.get('/editArticle', handleRoute(PageService.getEditArticlePacket));

export default router;
