import { Router } from 'express';

import { IRequest } from '~/server/interfaces';
import { formatNewsFilter } from '~/utils';
import {
  getHomePagePacket,
  getNewsPagePacket,
  getArticlePagePacket,
  getPersonnelPacket,
} from '~/server/services';

const router = Router();

router.get('/', async (req: IRequest, res, next) => {
  const homePage = await getHomePagePacket();

  req.appState = { homePage };

  next();
});

router.get('/news/:categoryLabel?/:page?', async (req: IRequest, res, next) => {
  const filter = formatNewsFilter(req.params);
  const newsPage = await getNewsPagePacket(filter);

  req.appState = { newsPage };

  next();
});

router.get('/article/:label', async (req: IRequest, res, next) => {
  const { label } = req.params;
  const articlePage = await getArticlePagePacket(label);

  req.appState = { articlePage };

  next();
});

router.get('/personnel', async (req: IRequest, res, next) => {
  const personnelPage = await getPersonnelPacket();

  req.appState = { personnelPage };

  next();
});

export default router;
