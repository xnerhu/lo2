import { Router } from 'express';

import news from './news';
import shortNews from './short-news';
import slider from './slider';
import teachers from './teachers';
import gallery from './gallery';

const router = Router();

router.use(news);
router.use(shortNews);
router.use(slider);
router.use(teachers);
router.use(gallery);

export default router;
