import { Router } from 'express';

import { IRequest } from '../../interfaces';
import { getShortNews, getSliderItems } from '~/server/services';

const router = Router();

router.get('/', async (req: IRequest, res, next) => {
  const [shortNews, slider] = await Promise.all([
    getShortNews(),
    getSliderItems(),
  ]);

  req.appState = { shortNews, slider };

  next();
});

export default router;
