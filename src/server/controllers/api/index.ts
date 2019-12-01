import { Router } from 'express';

import slider from './slider';
import shortNews from './short-news';
import news from './news';
import article from './article';
import gallery from './gallery';
import album from './album';
import teachers from './teachers';

const router = Router();

router.use(slider);
router.use(shortNews);
router.use(news);
router.use(article);
router.use(gallery);
router.use(album);
router.use(teachers);

export default router;
