import { Router } from 'express';

import { IRequest } from '../../interfaces/req';
import { getShortNews } from '../api/short-news';
import { getSliderItems } from '../api/slider';

const router = Router();

router.get('/', async (req: IRequest, res, next) => {
  const [shortNews, slider] = await Promise.all([getShortNews(), getSliderItems()]);

  req.appState = { shortNews, slider };

  next();
});

export default router;
