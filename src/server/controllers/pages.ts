import { Router } from 'express';

import { IRequest } from '~/server/interfaces';
import { formatNewsFilter } from '~/utils';
import {
  getHomePagePacket,
  getNewsPagePacket,
  getArticlePagePacket,
  getPersonnelPacket,
  getAddArticlePacket,
} from '~/server/services';
import { withAuth } from '../middleware';
import { verifyAccessToken } from '../utils';

const router = Router();

router.get('/', async (req: IRequest, res, next) => {
  const homePage = await getHomePagePacket();

  req.appState = { ...req.appState, homePage };

  next();
});

router.get('/news/:categoryLabel?/:page?', async (req: IRequest, res, next) => {
  const filter = formatNewsFilter(req.params);
  const newsPage = await getNewsPagePacket(filter);

  req.appState = { ...req.appState, newsPage };

  next();
});

router.get('/article/:label', async (req: IRequest, res, next) => {
  const { label } = req.params;
  const articlePage = await getArticlePagePacket(label);

  req.appState = { ...req.appState, articlePage };

  next();
});

router.get('/personnel', async (req: IRequest, res, next) => {
  const personnelPage = await getPersonnelPacket();

  req.appState = { ...req.appState, personnelPage };

  next();
});

router.get(
  '/add-article',
  withAuth('/login'),
  async (req: IRequest, res, next) => {
    const addArticlePage = await getAddArticlePacket();

    req.appState = { ...req.appState, addArticlePage };

    next();
  },
);

router.get('/logout', (req, res, next) => {
  res.redirect('/api/logout');
});

router.get('/*', async (req: IRequest, res, next) => {
  try {
    const tokenPayload = await verifyAccessToken(req);

    if (tokenPayload) {
      req.appState = { ...req.appState, user: tokenPayload.user };
    }
  } catch (err) {}

  next();
});

export default router;
