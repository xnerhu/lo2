import { Router } from 'express';

import { IRequest } from '~/server/interfaces';
import { formatNewsFilter } from '~/utils';
import {
  getHomePagePacket,
  getNewsPagePacket,
  getArticlePagePacket,
  getPersonnelPacket,
  getAddArticlePacket,
  getEditArticlePacket,
} from '~/server/services';
import { withAuth, withAuthNoError } from '../middleware';
import { verifyAccessToken, logout } from '../utils';

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

router.get(
  '/article/:label',
  withAuthNoError,
  async (req: IRequest, res, next) => {
    const { label } = req.params;
    const articlePage = await getArticlePagePacket(label, req.user);

    req.appState = { ...req.appState, articlePage };

    next();
  },
);

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

router.get(
  '/edit-article/:label',
  withAuth('/login'),
  async (req: IRequest, res, next) => {
    const editArticlePage = await getEditArticlePacket(
      req.params.label,
      req.user,
    );

    req.appState = { ...req.appState, editArticlePage };

    next();
  },
);

router.get('/logout', (req, res, next) => {
  logout(res);
  res.redirect('/api/logout');
});

router.get('/change-password', withAuth('/login'));

router.get('/*', async (req: IRequest, res, next) => {
  if (!req.user) {
    try {
      const tokenPayload = await verifyAccessToken(req);

      if (tokenPayload) {
        req.appState = { ...req.appState, user: tokenPayload.user };
      }
    } catch (err) {}
  } else {
    req.appState = { ...req.appState, user: req.user };
  }

  req.appState = { ...req.appState, signedIn: req.appState.user != null };

  next();
});

export default router;
